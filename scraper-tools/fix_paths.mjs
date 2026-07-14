import fs from 'fs';

const jsFile = 'assets/index-BjfyAN4m.js';
let content = fs.readFileSync(jsFile, 'utf8');

// Fix image paths
content = content.replace(/"\/logo-avatar.png"/g, '"./logo-avatar.png"');
content = content.replace(/"\/logo-navbar.png"/g, '"./logo-navbar.png"');
content = content.replace(/"\/logo-icon.png"/g, '"./logo-icon.png"');

fs.writeFileSync(jsFile, content, 'utf8');
console.log('Fixed JS image paths!');

const htmlFile = 'index.html';
let html = fs.readFileSync(htmlFile, 'utf8');
html = html.replace(/"\/og-image.png"/g, '"./og-image.png"');
fs.writeFileSync(htmlFile, html, 'utf8');
console.log('Fixed HTML image paths!');
