const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { DashboardPage } = require('../pages/dashboardPage');

test.describe('Dashboard tests', () => {

  test('Dashboard should load after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Login
    await loginPage.goto();
    await loginPage.login('neel@gmail.com', 'Neel@123');

    // ✅ Correct verification
    await dashboardPage.verifyDashboard();
  });

  test('User can navigate to Profile page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login('neel@gmail.com', 'Neel@123');

    await dashboardPage.gotoProfile();
    await expect(page).toHaveURL(/profile/i);
  });

  test('User can navigate to Account Settings', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login('neel@gmail.com', 'Neel@123');

    await dashboardPage.gotoAccount();
    await expect(page).toHaveURL(/profile/i);
  });

  test('User can logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.login('neel@gmail.com', 'Neel@123');

    await dashboardPage.logout();
    await expect(page).toHaveURL('https://provider.fetchtrue.com/signin');
  });

});
