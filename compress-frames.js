/**
 * compress-frames.js
 * Converts all 240 PNG animation frames to WebP (70-80% smaller file size)
 * Run: node compress-frames.js
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './assets/food/ezgif-506832bdb3477620-png-split';
const outputDir = './assets/food/frames-webp';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png')).sort();
let done = 0;

console.log(`Converting ${files.length} PNG frames to WebP...`);

Promise.all(files.map(file => {
  const inputPath = path.join(inputDir, file);
  const outputFile = file.replace('.png', '.webp');
  const outputPath = path.join(outputDir, outputFile);

  return sharp(inputPath)
    .webp({ quality: 82 })
    .toFile(outputPath)
    .then(() => {
      done++;
      if (done % 20 === 0) console.log(`  ${done}/${files.length} done...`);
    });
})).then(() => {
  console.log(`\n✅ All ${files.length} frames converted to WebP!`);
  console.log(`Output: ${outputDir}`);
  
  // Compare sizes
  const pngSize = files.reduce((sum, f) => sum + fs.statSync(path.join(inputDir, f)).size, 0);
  const webpFiles = fs.readdirSync(outputDir).filter(f => f.endsWith('.webp'));
  const webpSize = webpFiles.reduce((sum, f) => sum + fs.statSync(path.join(outputDir, f)).size, 0);
  
  console.log(`\nOriginal PNG:  ${(pngSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`New WebP:      ${(webpSize / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Saved:         ${(100 - (webpSize / pngSize * 100)).toFixed(0)}% smaller!`);
}).catch(err => console.error('Error:', err));
