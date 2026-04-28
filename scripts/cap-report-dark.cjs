const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto('http://localhost:5174/pyramid/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/tmp/dash-dark.png', clip: { x: 200, y: 0, width: 900, height: 220 } });
  await page.getByText(/^Report$/).first().click().catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/report-dark.png', clip: { x: 200, y: 0, width: 900, height: 220 } });
  console.log('OK');
  await browser.close();
})();
