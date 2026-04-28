const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('console', msg => { if (msg.type() === 'error') console.error('ERR', msg.text()); });
  page.on('pageerror', e => console.error('PAGEERR', e.message));
  await page.goto('http://localhost:5174/pyramid/', { waitUntil: 'networkidle' });
  const link = page.getByText(/credit balance/i).first();
  await link.click().catch(() => {});
  await page.waitForTimeout(800);
  await page.screenshot({ path: '/tmp/credit-balance.png', fullPage: false });
  console.log('OK');
  await browser.close();
})();
