import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(scriptDir, '..');
const validator = path.join(root, 'scripts', 'validate-resources.mjs');
const fixtureRoot = path.join(root, 'test-fixtures', 'invalid-paths');

const result = spawnSync(process.execPath, [validator, '--root', fixtureRoot], {
  encoding: 'utf8'
});

const output = `${result.stdout}\n${result.stderr}`;
const expectedMessages = [
  'essentials must contain no more than 3 resources',
  'essentials references unknown resource',
  'skipUntilLater must be a non-empty array',
  'checkpoint must be a non-empty string',
  'relatedPages target does not exist',
  'essentials repeats resource already used'
];

if (result.status === 0) {
  console.error('Expected invalid fixture validation to fail, but it passed.');
  process.exit(1);
}

const missingMessages = expectedMessages.filter((message) => !output.includes(message));

if (missingMessages.length > 0) {
  console.error('Invalid fixture failed, but expected validation messages were missing:');
  for (const message of missingMessages) {
    console.error(`- ${message}`);
  }
  console.error(output);
  process.exit(1);
}

console.log('Invalid fixture failed with the expected structured-data validation messages.');
