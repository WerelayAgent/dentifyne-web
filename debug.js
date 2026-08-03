const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  const start = Date.now();
  console.log('Loading page...');
  
  page.on('request', request => {
    console.log(`[${Date.now() - start}ms] Request: ${request.url()}`);
  });
  
  page.on('requestfailed', request => {
    console.log(`[${Date.now() - start}ms] Failed: ${request.url()} - ${request.failure().errorText}`);
  });
  
  page.on('requestfinished', request => {
    // console.log(`[${Date.now() - start}ms] Finished: ${request.url()}`);
  });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  try {
    await page.goto('http://localhost:8080', { waitUntil: 'networkidle2', timeout: 15000 });
  } catch (e) {
    console.log('Goto error:', e.message);
  }
  
  console.log(`Total time: ${Date.now() - start}ms`);
  
  await browser.close();
})();
