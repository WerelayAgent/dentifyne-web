import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function processFiles() {
  const targetDir = './site/defyne.xyz';
  let filesModified = 0;

  walkDir(targetDir, (filePath) => {
    if (filePath.endsWith('.png') || filePath.endsWith('.jpg') || filePath.endsWith('.ttf') || filePath.endsWith('.woff2') || filePath.endsWith('.ico')) {
      return;
    }

    let content = fs.readFileSync(filePath, 'utf-8');
    let original = content;

    // Replacements
    content = content.replace(/Defyne/g, 'Dentifyne');
    content = content.replace(/DEFYNE/g, 'DENTIFYNE');
    content = content.replace(/defyne/g, 'dentifyne');
    
    // Address replacement if it exists
    content = content.replace(/2M47TxWHGnhNtq6pM5zPXdATBtuqubxn5EPFgFmEawCQ/g, 'coming soon on pump.fun');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`Updated: ${filePath}`);
      filesModified++;
    }
  });

  console.log(`Total files modified: ${filesModified}`);
}

processFiles();
