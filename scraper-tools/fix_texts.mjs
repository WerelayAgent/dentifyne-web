import fs from 'fs';

const jsFile = 'assets/index-BjfyAN4m.js';
let content = fs.readFileSync(jsFile, 'utf8');

// Replace CA
content = content.replace(/6dSpj25Mn2NLnJsw5ED8TKFFdAbRWULhi8Fivzispump/g, 'coming soon on pump.fun');

// Replace Ticker
content = content.replace(/\$DYFN/g, '$DTFN');
content = content.replace(/\$dyfn/g, '$dtfn');

// Replace @askdentifyne to @dentifyne
content = content.replace(/@askdentifyne/gi, '@dentifyne');
content = content.replace(/@AskDentifyne/g, '@Dentifyne');
content = content.replace(/@askDentifyne/g, '@dentifyne');

fs.writeFileSync(jsFile, content, 'utf8');
console.log('Fixed CA, ticker, and handle!');
