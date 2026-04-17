const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://api.fetchtrue.com/signin');
  await page.fill('[placeholder="admin123"]', 'Admin@FetchTrue');
  await page.fill('[placeholder="Enter your password"]', '@FetchT2025!Root#');
  await page.click('button:has-text("Sign in")');
  await page.waitForTimeout(5000);
  console.log('url', page.url());
  console.log('text=Dashboard count', await page.locator('text=Dashboard').count());
  console.log('a:has-text("Dashboard") count', await page.locator('a:has-text("Dashboard")').count());
  console.log('[role="link"]:has-text("Dashboard") count', await page.locator('[role="link"]:has-text("Dashboard")').count());
  console.log('remember count', await page.locator('text=Remember me').count());
  await browser.close();
})();
