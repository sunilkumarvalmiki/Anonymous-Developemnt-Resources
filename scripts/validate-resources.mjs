import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
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

  if (!absoluteTarget.startsWith(root)) {
    addFailure(file, lineNumber, `local link escapes repository: ${target}`);
    return;
  }

  if (!fs.existsSync(absoluteTarget)) {
    addFailure(file, lineNumber, `local link target does not exist: ${target}`);
  }
}

const files = walk(root);
const markdownFiles = files.filter((file) => file.endsWith('.md'));

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

console.log(`Resource validation passed for ${markdownFiles.length} markdown files.`);
