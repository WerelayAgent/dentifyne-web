const fs = require('fs');
const path = require('path');

function processFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fp = path.join(dir, file);
        if (fs.statSync(fp).isDirectory()) {
            if (file !== '.git' && file !== 'node_modules' && file !== '.next' && file !== 'scraper-tools') {
                processFiles(fp);
            }
        } else if (fp.endsWith('.html') || fp.endsWith('.js') || fp.endsWith('.json') || fp.endsWith('.txt')) {
            let content = fs.readFileSync(fp, 'utf8');
            let original = content;
            
            // Fix Twitter links specifically to what the user requested
            content = content.replace(/x\.com\/askDentifyne/gi, 'x.com/Dentifyne');
            content = content.replace(/twitter\.com\/askDentifyne/gi, 'x.com/Dentifyne');
            
            // Also replace any generic @askDentifyne handles if needed? The user only asked for the link.
            // Let's also just replace generic x.com/Dentifyne to x.com/Dentifyne just in case
            content = content.replace(/twitter\.com\/Dentifyne/gi, 'x.com/Dentifyne');
            
            if (content !== original) {
                fs.writeFileSync(fp, content);
                console.log('Fixed Twitter Handle', fp);
            }
        }
    }
}
processFiles('.');
console.log('Done.');
