const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.error('PAGEERR', e.message));
  await page.goto('http://localhost:5173/pyramid/', { waitUntil: 'networkidle' });
  await page.getByText(/^Report$/).first().click().catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/report.png' });
  console.log('OK');
  await browser.close();
})();
