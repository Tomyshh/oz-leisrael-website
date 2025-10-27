const fs = require('fs');
const path = require('path');

// Fonction pour copier récursivement un dossier
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('📁 Copying files for standalone build...');

const standaloneDir = path.join(process.cwd(), '.next/standalone');

if (fs.existsSync(standaloneDir)) {
  // Copier le dossier public
  const publicSource = path.join(process.cwd(), 'public');
  const publicDest = path.join(standaloneDir, 'public');
  
  console.log('📁 Copying public/ directory...');
  copyRecursiveSync(publicSource, publicDest);
  
  // Copier le dossier .next/static
  const staticSource = path.join(process.cwd(), '.next/static');
  const staticDest = path.join(standaloneDir, '.next/static');
  
  console.log('📁 Copying .next/static/ directory...');
  copyRecursiveSync(staticSource, staticDest);
  
  console.log('✅ Standalone build is ready!');
  console.log('');
  console.log('To run the standalone server:');
  console.log('  cd .next/standalone');
  console.log('  node server.js');
} else {
  console.log('⚠️  .next/standalone directory not found');
  console.log('Make sure output: "standalone" is set in next.config.js');
}

