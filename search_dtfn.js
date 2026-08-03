const fs = require('fs');
const path = require('path');

const jsDir = 'assets';
if (fs.existsSync(jsDir)) {
    const files = fs.readdirSync(jsDir);
    for (const file of files) {
        if (file.endsWith('.js')) {
            const fp = path.join(jsDir, file);
            const content = fs.readFileSync(fp, 'utf8');
            const match = content.match(/.{0,30}DTFN.{0,30}/g);
            if (match) {
                console.log('Found in', file);
                match.forEach(m => console.log(m));
            }
        }
    }
}
