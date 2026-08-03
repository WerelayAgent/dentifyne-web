const fs = require('fs');
const path = require('path');

// 1. Remove floating box from index.html
let indexContent = fs.readFileSync('index.html', 'utf8');
const caScript = /<script>\s*setInterval\(\(\) => \{[^]*?<\/script>/;
if (caScript.test(indexContent)) {
    indexContent = indexContent.replace(caScript, '');
    fs.writeFileSync('index.html', indexContent);
    console.log("Removed floating CA box from index.html");
}

// 2. Replace 'coming soon on Pons Family' in JS assets with the CA
const jsDir = 'assets';
const files = fs.readdirSync(jsDir);
for (const file of files) {
    if (file.endsWith('.js')) {
        const fp = path.join(jsDir, file);
        let content = fs.readFileSync(fp, 'utf8');
        let original = content;
        
        content = content.replace(/coming soon on Pons Family/gi, '0xbdcd38f0194e241a4d3ee1f078e4fdd6a97ce080');
        
        if (content !== original) {
            fs.writeFileSync(fp, content);
            console.log('Replaced coming soon with CA in', fp);
        }
    }
}
console.log('Done.');
