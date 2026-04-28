const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  page.on('console', msg => { if (msg.type() === 'error') console.error('ERR', msg.text()); });
  page.on('pageerror', e => console.error('PAGEERR', e.message));

  // Light: Users
  await page.goto('http://localhost:5173/pyramid/', { waitUntil: 'networkidle' });
  await page.getByText(/^Users$/).first().click().catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/theme-light-users.png' });

  // Toggle to dark
  await page.getByRole('button', { name: /switch to dark mode/i }).click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/tmp/theme-dark-users.png' });

  // Dark: Credit balance
  await page.getByText(/credit balance/i).first().click().catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/theme-dark-credit.png' });

  // Dark: Dashboard
  await page.getByText(/^Dashboard$/).first().click().catch(() => {});
  await page.waitForTimeout(500);
  await page.screenshot({ path: '/tmp/theme-dark-dashboard.png' });

  console.log('OK');
  await browser.close();
})();
