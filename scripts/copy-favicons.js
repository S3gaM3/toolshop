import { copyFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const publicDir = join(projectRoot, 'public');
const srcIconsDir = join(projectRoot, 'src', 'assets', 'icons');

mkdirSync(publicDir, { recursive: true });

const files = [
  { src: join(srcIconsDir, 'logo-light.png'), dst: join(publicDir, 'logo-light.png') },
  { src: join(srcIconsDir, 'logo-dark.png'), dst: join(publicDir, 'logo-dark.png') },
];

for (const { src, dst } of files) {
  try {
    copyFileSync(src, dst);
    console.log(`✓ Copied ${src} → ${dst}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn(`⚠ File not found: ${src}`);
    } else {
      console.error(`✗ Error copying ${src}:`, err.message);
    }
  }
}
