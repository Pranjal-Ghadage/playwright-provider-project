const { test, expect } = require('@playwright/test');
const { provLogPage } = require('../pages/provlogPage');
const { provdashPage } = require('../pages/provdashPage');
const { SubscribeServicePage } = require('../pages/subscribePage');

test.describe("subscribe service", () => {

  let log, dash, serv;

  test.beforeEach(async ({ page }) => {

    log = new provLogPage(page);
    dash = new provdashPage(page);
    serv = new SubscribeServicePage(page);

    // Login
    await log.goto();
    await log.login("neel@gmail.com", "Neel@123");
    await log.clicksignin();
  await expect(page).toHaveURL(
    "https://provider.fetchtrue.com/",{ timeout: 20000 });

  await expect(log.dashboard).toBeVisible({ timeout: 30000 });  });

  test('Subscribe and Unsubscribe service by index', async ({ page }) => {

    await serv.goto();

    await page.waitForTimeout(2000);

    await serv.subscribeByIndex(0);
    await page.waitForTimeout(1000);

    await serv.unsubscribeByIndex(1);
  });

});