const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

const caScript = `
<script>
    setInterval(() => {
        if (!document.getElementById('floating-ca-box')) {
            const div = document.createElement('div');
            div.id = 'floating-ca-box';
            div.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 999999; font-family: monospace; font-size: 13px; color: #fff; background: rgba(0,0,0,0.8); padding: 10px 14px; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; backdrop-filter: blur(4px); box-shadow: 0 4px 12px rgba(0,0,0,0.3); user-select: all; cursor: text; transition: transform 0.2s;';
            div.innerText = 'CA: 0xbdcd38f0194e241a4d3ee1f078e4fdd6a97ce080';
            
            // Hover effect
            div.onmouseover = () => div.style.transform = 'translateY(-2px)';
            div.onmouseout = () => div.style.transform = 'translateY(0)';
            
            document.body.appendChild(div);
        }
    }, 500);
</script>
</body>`;

if (content.includes('</body>')) {
    content = content.replace('</body>', caScript);
    fs.writeFileSync('index.html', content);
    console.log("Added JS injection for CA.");
} else {
    console.log("</body> not found");
}
