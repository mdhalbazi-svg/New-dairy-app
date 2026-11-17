
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const out = path.join(root, 'www');

const excluded = new Set([
  '.git',
  '.github',
  'node_modules',
  'android',
  'www',
  'package.json',
  'package-lock.json',
  'build.js',
  'capacitor.config.js',
  'capacitor.config.json',
  'README.md',
  'LICENSE',
  'ICONS.md'
]);

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

function copyDir(src, dest) {
  for (const name of fs.readdirSync(src)) {
    if (excluded.has(name) || name.startsWith('.')) continue;

    const from = path.join(src, name);
    const to = path.join(dest, name);
    const stat = fs.statSync(from);

    if (stat.isDirectory()) {
      fs.mkdirSync(to, { recursive: true });
      copyDir(from, to);
    } else {
      fs.copyFileSync(from, to);
    }
  }
}

if (!fs.existsSync(path.join(root, 'index.html'))) {
  throw new Error('index.html missing');
}

copyDir(root, out);

console.log('Website files copied successfully to www');
