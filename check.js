const fs = require('fs');
const code = fs.readFileSync('assets/index-BjfyAN4m.js', 'utf8');
const chunks = code.match(/import\([^\)]+\)/g);
console.log('Dynamic imports:', chunks);
