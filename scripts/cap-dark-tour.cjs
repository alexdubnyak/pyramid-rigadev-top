const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.error('PAGEERR', e.message));

  await page.addInitScript(() => localStorage.setItem('theme', 'dark'));
  await page.goto('http://localhost:5173/pyramid/', { waitUntil: 'networkidle' });

  await page.getByText(/^Users$/).first().click().catch(() => {});
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/dark2-users.png' });

  await page.getByText(/credit balance/i).first().click().catch(() => {});
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/dark2-credit.png' });

  await page.getByText(/cash settlement/i).first().click().catch(() => {});
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/dark2-cash.png' });

  console.log('OK');
  await browser.close();
})();
