const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  const cases = [
    ['home-mobile', '/'],
    ['free-card-mobile', '/card/free/'],
    ['plus-benefits-mobile', '/benefits/user-plus/'],
    ['owner-benefits-mobile', '/benefits/business-owner/'],
  ];
  for (const [name, route] of cases) {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(`http://127.0.0.1:4173${route}`, { waitUntil: 'networkidle' });
    if (!response || response.status() !== 200) throw new Error(`${route} did not return 200`);
    if (errors.length) throw new Error(`${route}: ${errors.join('; ')}`);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    if (overflow) throw new Error(`${route} has horizontal overflow`);
    await page.screenshot({ path: path.join('artifacts', `${name}.png`), fullPage: true });
    console.log(`PASS ${route} ${await page.title()}`);
  }

  const qrCases = [
    ['/card/free/', 'https://whatsout-fcc29.web.app/'],
    ['/card/user-plus/', 'https://eddydavila.github.io/whatsout-bizcard/benefits/user-plus/'],
    ['/card/business-owner/', 'https://eddydavila.github.io/whatsout-bizcard/benefits/business-owner/'],
  ];
  for (const [route, expected] of qrCases) {
    await page.goto(`http://127.0.0.1:4173${route}`, { waitUntil: 'networkidle' });
    const result = await page.evaluate(async () => {
      if (!('BarcodeDetector' in window)) return { unsupported: true };
      const codes = await new BarcodeDetector({ formats: ['qr_code'] }).detect(document.querySelector('.qr-panel img'));
      return { value: codes[0]?.rawValue || '' };
    });
    if (!result.unsupported && result.value !== expected) throw new Error(`${route} QR decoded as ${result.value}`);
    console.log(result.unsupported ? `SKIP ${route} QR decode API unavailable` : `PASS ${route} QR decodes correctly`);
  }
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
