import fs from 'fs';
import path from 'path';
import https from 'https';

const code = fs.readFileSync('assets/index-BjfyAN4m.js', 'utf8');
// match import("./chunk-id.js")
const chunks = [...code.matchAll(/import\(\"(.\/[^\"]+)\"\)/g)].map(m => m[1]);

console.log(`Found ${chunks.length} chunks.`);

const uniqueChunks = [...new Set(chunks)];

async function downloadChunk(chunk) {
  // chunk is like "./LandingScreen-DfT34Eap-BIvRs1Tu.js"
  const filename = chunk.replace('./', '');
  const url = `https://defyne.xyz/assets/${filename}`;
  const dest = path.join('assets', filename);
  
  if (fs.existsSync(dest)) return;

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed: ${url}`);
        return resolve(false);
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        
        // Let's also rebrand inside the chunk!
        let content = fs.readFileSync(dest, 'utf8');
        let original = content;
        content = content.replace(/Defyne/g, 'Dentifyne');
        content = content.replace(/DEFYNE/g, 'DENTIFYNE');
        content = content.replace(/defyne/g, 'dentifyne');
        if (content !== original) {
          fs.writeFileSync(dest, content, 'utf8');
        }

        resolve(true);
      });
    }).on('error', () => resolve(false));
  });
}

async function run() {
  for (const chunk of uniqueChunks) {
    await downloadChunk(chunk);
  }
  console.log('All chunks downloaded and rebranded!');
}

run();
