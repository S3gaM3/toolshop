import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const publicDir = 'public';
const srcIconsDir = 'src/assets/icons';

mkdirSync(publicDir, { recursive: true });

const files = [
  { src: join(srcIconsDir, 'logo-light.png'), dst: join(publicDir, 'logo-light.png') },
  { src: join(srcIconsDir, 'logo-dark.png'), dst: join(publicDir, 'logo-dark.png') },
];

for (const { src, dst } of files) {
  try {
    if (existsSync(src)) {
      copyFileSync(src, dst);
      console.log(`✓ Copied ${src} → ${dst}`);
    } else {
      console.warn(`⚠ File not found: ${src}`);
    }
  } catch (err) {
    console.error(`✗ Error copying ${src}:`, err.message);
  }
}

console.log('Done!');
