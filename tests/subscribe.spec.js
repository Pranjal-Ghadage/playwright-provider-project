const { test } = require('@playwright/test');
const { provLogPage } = require("../pages/provlogPage");
const{provdashPage}=require("../pages/provdashPage");
const { SubscribeServicePage } = require('../pages/subscribePage');

test('Subscribe service with or without subcategory', async ({ page }) => {
   const log = new provLogPage(page);
   const dash = new provdashPage(page);
  const servicePage = new SubscribeServicePage(page);

  // -------- Login --------
  await log.goto();
  await log.login('neel@gmail.com', 'Neel@123');

  // -------- Verify dashboard --------
  await dashboardPage.verifyDashboard();

  // -------- Navigate --------
  await servicePage.goto();

  // -------- Filters --------
  await servicePage.selectModule('Finance');
  await servicePage.selectCategory('Banking');

  // Try subcategory (only if exists)
  await servicePage.handleSubCategoryIfPresent('Loans'); // safe call

  // -------- Subscribe Specific Service --------
  await servicePage.subscribeService('Account Opening Service');

  // -------- Verify --------
  await servicePage.verifySubscribed('Account Opening Service');
});
