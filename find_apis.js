const fs = require('fs');
const code = fs.readFileSync('assets/index-BjfyAN4m.js', 'utf8');
const routes = code.match(/\/api\/[a-zA-Z0-9_-]+/g);
console.log('API routes:', [...new Set(routes)]);
