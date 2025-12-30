const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { DashboardPage } = require('../pages/dashboardPage');
const { SubscribeServicePage } = require('../pages/subscribePage');

test('Subscribe service with or without subcategory', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const servicePage = new SubscribeServicePage(page);

  // -------- Login --------
  await loginPage.goto();
  await loginPage.login('mahi@gmail.com', 'Mahi@123');

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
