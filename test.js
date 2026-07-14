const fs = require('fs');
const code = fs.readFileSync('assets/index-BjfyAN4m.js', 'utf8');
const urls = code.match(/https?:\/\/[a-zA-Z0-9\.\-\_]*dentifyne[a-zA-Z0-9\.\-\_]*/gi);
console.log('URLs:', urls);
