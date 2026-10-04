/**
 * EG TECH — Production Build & Packaging Script
 * Generates verified production bundle in dist/ for GitHub Pages deployment.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

console.log('⚡ Starting EG TECH Production Build...');

// 1. Clean & recreate dist directory
if (fs.existsSync(DIST_DIR)) {
  fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR, { recursive: true });

// 2. Files to copy directly to root of dist/
const rootFiles = [
  'index.html',
  'styles.css',
  'app.js',
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon-48x48.png',
  'apple-touch-icon.png',
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'site.webmanifest',
  'egtech_brand_film.mp4',
  'egtech_brand_film_120frames.mp4',
  'egtech_brand_film_120frames_24fps.mp4'
];

rootFiles.forEach(file => {
  const src = path.join(ROOT_DIR, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(DIST_DIR, file));
    console.log(`  ✓ Copied ${file}`);
  }
});

// 3. SPA Fallback: 404.html (Copy of index.html for client-side routing on GitHub Pages)
const indexSrc = path.join(DIST_DIR, 'index.html');
if (fs.existsSync(indexSrc)) {
  fs.copyFileSync(indexSrc, path.join(DIST_DIR, '404.html'));
  console.log('  ✓ Created 404.html SPA fallback');
}

// 4. GitHub Pages .nojekyll flag
fs.writeFileSync(path.join(DIST_DIR, '.nojekyll'), '', 'utf8');
console.log('  ✓ Created .nojekyll flag');

// 5. Copy CNAME if present
const cnameSrc = path.join(ROOT_DIR, 'CNAME');
if (fs.existsSync(cnameSrc)) {
  fs.copyFileSync(cnameSrc, path.join(DIST_DIR, 'CNAME'));
  console.log('  ✓ Included CNAME');
}

// 6. Copy directories: assets/, frames/
function copyDirRecursive(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDirRecursive(path.join(ROOT_DIR, 'assets'), path.join(DIST_DIR, 'assets'));
console.log('  ✓ Copied assets/');

copyDirRecursive(path.join(ROOT_DIR, 'frames'), path.join(DIST_DIR, 'frames'));
console.log('  ✓ Copied frames/');

// 7. Verify index.html in dist
if (!fs.existsSync(path.join(DIST_DIR, 'index.html'))) {
  console.error('❌ Build failed: dist/index.html was not generated.');
  process.exit(1);
}

console.log('\n✨ EG TECH Build Complete: dist/ is ready for production deployment.\n');
