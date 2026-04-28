const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.error('PAGEERR', e.message));

  await page.goto('http://localhost:5174/pyramid/', { waitUntil: 'networkidle' });

  // Dashboard with from/to
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/dash.png', clip: { x: 200, y: 0, width: 900, height: 350 } });

  // Report
  await page.getByText(/^Report$/).first().click().catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/report.png', clip: { x: 200, y: 0, width: 900, height: 220 } });

  console.log('OK');
  await browser.close();
})();
