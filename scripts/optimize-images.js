const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

const imagesToOptimize = [
  {
    input: 'cover.png',
    output: 'cover.jpg',
    maxWidth: 1920,
    quality: 85
  },
  {
    input: 'zionism-community.jpg',
    output: 'zionism-community.jpg',
    maxWidth: 1200,
    quality: 85
  },
  {
    input: 'physical-preparation.png',
    output: 'physical-preparation.jpg',
    maxWidth: 1200,
    quality: 85
  },
  {
    input: 'spiritual-preparation.jpg',
    output: 'spiritual-preparation.jpg',
    maxWidth: 1200,
    quality: 85
  },
  {
    input: 'logo.png',
    output: 'logo.png',
    maxWidth: 400,
    quality: 90
  }
];

async function optimizeImages() {
  console.log('🖼️  Début de l\'optimisation des images...\n');

  for (const img of imagesToOptimize) {
    const inputPath = path.join(imagesDir, img.input);
    const outputPath = path.join(imagesDir, img.output);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  ${img.input} n'existe pas, ignoré`);
      continue;
    }

    try {
      // Backup original if different from output
      if (img.input !== img.output) {
        const backupPath = path.join(imagesDir, img.input.replace(/\.(jpg|png)$/, '-original.$1'));
        if (!fs.existsSync(backupPath)) {
          fs.copyFileSync(inputPath, backupPath);
        }
      }

      const stats = fs.statSync(inputPath);
      const originalSize = (stats.size / 1024 / 1024).toFixed(2);

      // Optimize
      await sharp(inputPath)
        .resize(img.maxWidth, null, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: img.quality, progressive: true })
        .toFile(outputPath + '.temp');

      // Replace original
      fs.renameSync(outputPath + '.temp', outputPath);

      const newStats = fs.statSync(outputPath);
      const newSize = (newStats.size / 1024 / 1024).toFixed(2);
      const reduction = ((1 - newStats.size / stats.size) * 100).toFixed(1);

      console.log(`✅ ${img.input}`);
      console.log(`   ${originalSize}MB → ${newSize}MB (-${reduction}%)\n`);

    } catch (error) {
      console.error(`❌ Erreur avec ${img.input}:`, error.message);
    }
  }

  console.log('✨ Optimisation terminée!');
}

optimizeImages().catch(console.error);

