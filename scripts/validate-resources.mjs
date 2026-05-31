import fs from 'node:fs';
import path from 'node:path';

function parseArgs(argv) {
  let selectedRoot = process.cwd();

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--root') {
      const value = argv[index + 1];
      if (!value) {
        throw new Error('Missing value for --root');
      }
      selectedRoot = value;
      index += 1;
      continue;
    }

    if (arg === '--help') {
      console.log('Usage: node scripts/validate-resources.mjs [--root <path>]');
      process.exit(0);
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return path.resolve(selectedRoot);
}

let root;

try {
  root = parseArgs(process.argv.slice(2));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.error(`Validation root does not exist or is not a directory: ${root}`);
  process.exit(1);
}

const ignoredDirs = new Set(['.git', 'node_modules']);
const forbiddenBinaryExtensions = new Set([
  '.7z',
  '.avif',
  '.doc',
  '.docx',
  '.gif',
  '.ico',
  '.jpeg',
  '.jpg',
  '.mov',
  '.mp3',
  '.mp4',
  '.pdf',
  '.png',
  '.rar',
  '.svg',
  '.webp',
  '.zip'
]);

const failures = [];
const resourceLevels = new Set(['beginner', 'intermediate', 'advanced', 'all-levels']);
const resourceFormats = new Set([
  'api',
  'book',
  'community',
  'course',
  'dataset',
  'docs',
  'list',
  'practice',
  'project',
  'reference',
  'roadmap',
  'tool'
]);
const resourceCosts = new Set(['free', 'freemium', 'mixed', 'paid']);
const resourceTrust = new Set([
  'beginner-friendly',
  'community-maintained',
  'official',
  'popular',
  'project-based',
  'regularly-updated'
]);
const resourceTimeToValue = new Set(['deep', 'fast', 'medium']);

function addFailure(file, line, message) {
  const location = line ? `${file}:${line}` : file;
  failures.push(`${location} - ${message}`);
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        files.push(...walk(path.join(dir, entry.name)));
      }
      continue;
    }

    files.push(path.join(dir, entry.name));
  }

  return files;
}

function toRelative(file) {
  return path.relative(root, file).replaceAll(path.sep, '/');
}

function isInsideRoot(filePath) {
  const relative = path.relative(root, filePath);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function slugifyHeading(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function collectHeadingSlugs(content) {
  const slugs = new Set();
  const duplicates = new Map();

  for (const line of content.split(/\r?\n/)) {
    const match = /^(#{1,6})\s+(.+?)\s*$/.exec(line);
    if (!match) {
      continue;
    }

    const base = slugifyHeading(match[2]);
    const seen = duplicates.get(base) ?? 0;
    duplicates.set(base, seen + 1);
    slugs.add(seen === 0 ? base : `${base}-${seen}`);
  }

  return slugs;
}

function validateLocalLink(file, lineNumber, target, headingSlugs) {
  const [targetPath, rawAnchor] = target.split('#');

  if (!targetPath && rawAnchor) {
    const anchor = decodeURIComponent(rawAnchor).toLowerCase();
    if (!headingSlugs.has(anchor)) {
      addFailure(file, lineNumber, `local anchor does not exist: #${rawAnchor}`);
    }
    return;
  }

  const decodedPath = decodeURIComponent(targetPath);
  const absoluteTarget = path.resolve(path.dirname(path.join(root, file)), decodedPath);

  if (!isInsideRoot(absoluteTarget)) {
    addFailure(file, lineNumber, `local link escapes repository: ${target}`);
    return;
  }

  if (!fs.existsSync(absoluteTarget)) {
    addFailure(file, lineNumber, `local link target does not exist: ${target}`);
  }
}

function findStructuredDataFile(fileName) {
  const dataFile = path.join(root, 'data', fileName);
  const rootFile = path.join(root, fileName);

  if (fs.existsSync(dataFile)) {
    return dataFile;
  }

  if (fs.existsSync(rootFile)) {
    return rootFile;
  }

  return null;
}

function readJsonArray(file) {
  const relative = toRelative(file);

  try {
    const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!Array.isArray(parsed)) {
      addFailure(relative, 0, 'structured data file must contain a JSON array');
      return [];
    }
    return parsed;
  } catch (error) {
    addFailure(relative, 0, `invalid JSON: ${error.message}`);
    return [];
  }
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateStringField(file, label, item, field) {
  if (!isNonEmptyString(item[field])) {
    addFailure(file, 0, `${label}.${field} must be a non-empty string`);
  }
}

function validateStringArrayField(file, label, item, field, options = {}) {
  const value = item[field];

  if (!Array.isArray(value)) {
    addFailure(file, 0, `${label}.${field} must be an array`);
    return [];
  }

  if (!options.allowEmpty && value.length === 0) {
    addFailure(file, 0, `${label}.${field} must be a non-empty array`);
    return [];
  }

  for (const entry of value) {
    if (!isNonEmptyString(entry)) {
      addFailure(file, 0, `${label}.${field} must contain only non-empty strings`);
      continue;
    }

    if (options.allowedValues && !options.allowedValues.has(entry)) {
      addFailure(file, 0, `${label}.${field} contains unsupported value: ${entry}`);
    }
  }

  return value;
}

function validateEnumStringField(file, label, item, field, allowedValues) {
  const value = item[field];

  if (!isNonEmptyString(value)) {
    addFailure(file, 0, `${label}.${field} must be a non-empty string`);
    return;
  }

  if (!allowedValues.has(value)) {
    addFailure(file, 0, `${label}.${field} contains unsupported value: ${value}`);
  }
}

function validateUrlField(file, label, item) {
  if (!isNonEmptyString(item.url)) {
    addFailure(file, 0, `${label}.url must be a non-empty string`);
    return;
  }

  try {
    const url = new URL(item.url);
    if (!['http:', 'https:'].includes(url.protocol)) {
      addFailure(file, 0, `${label}.url must use http or https`);
    }
  } catch {
    addFailure(file, 0, `${label}.url must be a valid URL`);
  }
}

function validateResources(resources, file) {
  const resourceIds = new Map();
  const resourceUrls = new Map();
  const relative = toRelative(file);

  for (const [index, resource] of resources.entries()) {
    const label = `resource[${index}]`;

    if (!resource || typeof resource !== 'object' || Array.isArray(resource)) {
      addFailure(relative, 0, `${label} must be an object`);
      continue;
    }

    validateStringField(relative, label, resource, 'id');
    validateStringField(relative, label, resource, 'name');
    validateStringField(relative, label, resource, 'description');
    validateUrlField(relative, label, resource);
    validateStringArrayField(relative, label, resource, 'categories');
    validateStringArrayField(relative, label, resource, 'topics');
    validateStringArrayField(relative, label, resource, 'level', { allowedValues: resourceLevels });
    validateStringArrayField(relative, label, resource, 'format', { allowedValues: resourceFormats });
    validateEnumStringField(relative, label, resource, 'cost', resourceCosts);
    validateStringArrayField(relative, label, resource, 'trust', { allowedValues: resourceTrust });
    validateStringArrayField(relative, label, resource, 'useCases');
    validateEnumStringField(relative, label, resource, 'timeToValue', resourceTimeToValue);

    if (isNonEmptyString(resource.id)) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(resource.id)) {
        addFailure(relative, 0, `${label}.id must use kebab-case`);
      }

      if (resourceIds.has(resource.id)) {
        addFailure(relative, 0, `${label}.id duplicates ${resourceIds.get(resource.id)}`);
      } else {
        resourceIds.set(resource.id, label);
      }
    }

    if (isNonEmptyString(resource.url)) {
      if (resourceUrls.has(resource.url)) {
        addFailure(relative, 0, `${label}.url duplicates ${resourceUrls.get(resource.url)}`);
      } else {
        resourceUrls.set(resource.url, label);
      }
    }
  }

  return resourceIds;
}

function validatePathResourceList(file, label, pathItem, field, resourceIds, options = {}) {
  const values = validateStringArrayField(file, label, pathItem, field, {
    allowEmpty: options.allowEmpty
  });

  if (options.min && values.length < options.min) {
    addFailure(file, 0, `${label}.${field} must contain at least ${options.min} resource`);
  }

  if (options.max && values.length > options.max) {
    addFailure(file, 0, `${label}.${field} must contain no more than ${options.max} resources`);
  }

  return values.filter((resourceId) => {
    if (!resourceIds.has(resourceId)) {
      addFailure(file, 0, `${label}.${field} references unknown resource: ${resourceId}`);
      return false;
    }
    return true;
  });
}

function validateRelatedPages(file, label, pathItem) {
  const pages = validateStringArrayField(file, label, pathItem, 'relatedPages');

  for (const page of pages) {
    const target = path.resolve(root, page);

    if (!isInsideRoot(target)) {
      addFailure(file, 0, `${label}.relatedPages escapes repository: ${page}`);
      continue;
    }

    if (!fs.existsSync(target)) {
      addFailure(file, 0, `${label}.relatedPages target does not exist: ${page}`);
    }
  }
}

function validatePaths(paths, file, resourceIds) {
  const pathIds = new Map();
  const relative = toRelative(file);

  for (const [index, pathItem] of paths.entries()) {
    const label = `path[${index}]`;

    if (!pathItem || typeof pathItem !== 'object' || Array.isArray(pathItem)) {
      addFailure(relative, 0, `${label} must be an object`);
      continue;
    }

    validateStringField(relative, label, pathItem, 'id');
    validateStringField(relative, label, pathItem, 'title');
    validateStringField(relative, label, pathItem, 'goal');
    validateStringArrayField(relative, label, pathItem, 'audience', { allowedValues: resourceLevels });
    const essentials = validatePathResourceList(relative, label, pathItem, 'essentials', resourceIds, {
      min: 1,
      max: 3
    });
    const next = validatePathResourceList(relative, label, pathItem, 'next', resourceIds, {
      allowEmpty: true,
      max: 5
    });
    const deepDives = validatePathResourceList(relative, label, pathItem, 'deepDives', resourceIds, {
      allowEmpty: true,
      max: 5
    });
    validateStringArrayField(relative, label, pathItem, 'skipUntilLater');
    validateStringField(relative, label, pathItem, 'checkpoint');
    validateRelatedPages(relative, label, pathItem);

    if (isNonEmptyString(pathItem.id)) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(pathItem.id)) {
        addFailure(relative, 0, `${label}.id must use kebab-case`);
      }

      if (pathIds.has(pathItem.id)) {
        addFailure(relative, 0, `${label}.id duplicates ${pathIds.get(pathItem.id)}`);
      } else {
        pathIds.set(pathItem.id, label);
      }
    }

    const seen = new Map();
    for (const [field, values] of [
      ['essentials', essentials],
      ['next', next],
      ['deepDives', deepDives]
    ]) {
      for (const resourceId of values) {
        if (seen.has(resourceId)) {
          addFailure(relative, 0, `${label}.${field} repeats resource already used in ${seen.get(resourceId)}: ${resourceId}`);
        } else {
          seen.set(resourceId, field);
        }
      }
    }
  }

  return pathIds;
}

function validateStructuredData() {
  const resourcesFile = findStructuredDataFile('resources.json');
  const pathsFile = findStructuredDataFile('paths.json');

  if (!resourcesFile && !pathsFile) {
    return { resources: 0, paths: 0 };
  }

  if (!resourcesFile) {
    addFailure('data/resources.json', 0, 'resources.json is required when paths.json exists');
    return { resources: 0, paths: 0 };
  }

  if (!pathsFile) {
    addFailure('data/paths.json', 0, 'paths.json is required when resources.json exists');
    return { resources: 0, paths: 0 };
  }

  const resources = readJsonArray(resourcesFile);
  const paths = readJsonArray(pathsFile);
  const resourceIds = validateResources(resources, resourcesFile);
  validatePaths(paths, pathsFile, resourceIds);

  return { resources: resources.length, paths: paths.length };
}

const files = walk(root);
const markdownFiles = files.filter((file) => file.endsWith('.md'));
const structuredCounts = validateStructuredData();

for (const file of files) {
  const relative = toRelative(file);
  const ext = path.extname(file).toLowerCase();

  if (forbiddenBinaryExtensions.has(ext)) {
    addFailure(relative, 0, 'binary assets should be linked, not committed');
  }
}

for (const file of markdownFiles) {
  const relative = toRelative(file);
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);
  const headingSlugs = collectHeadingSlugs(content);
  const seenLinks = new Map();

  if (/\b(TODO|TBD)\b/i.test(content)) {
    addFailure(relative, 0, 'contains TODO or TBD placeholder text');
  }

  for (let index = 0; index < lines.length; index += 1) {
    const lineNumber = index + 1;
    const line = lines[index];
    const linkPattern = /\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
    let match;

    while ((match = linkPattern.exec(line)) !== null) {
      const text = match[1].trim();
      const url = match[2].trim();

      if (!text) {
        addFailure(relative, lineNumber, 'link text is empty');
      }

      if (!url || url === '#') {
        addFailure(relative, lineNumber, 'link URL is empty');
        continue;
      }

      if (/^(https?:\/\/|mailto:)/i.test(url)) {
        const previousLine = seenLinks.get(url);
        if (previousLine) {
          addFailure(relative, lineNumber, `duplicate external link also appears on line ${previousLine}: ${url}`);
        } else {
          seenLinks.set(url, lineNumber);
        }

        if (line.trim().startsWith('- [') && !line.includes(' - ')) {
          addFailure(relative, lineNumber, 'resource entries must include " - " followed by a description');
        }

        if (line.trim().startsWith('- [') && !/[.!?)]$/.test(line.trim())) {
          addFailure(relative, lineNumber, 'resource descriptions must end with punctuation');
        }
      } else {
        validateLocalLink(relative, lineNumber, url, headingSlugs);
      }
    }
  }
}

if (failures.length > 0) {
  console.error('Resource validation failed:');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

const structuredMessage =
  structuredCounts.resources > 0 || structuredCounts.paths > 0
    ? `, ${structuredCounts.resources} resources, and ${structuredCounts.paths} paths`
    : '';

console.log(`Resource validation passed for ${markdownFiles.length} markdown files${structuredMessage}.`);
