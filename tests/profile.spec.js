const { test } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');
const { DashboardPage } = require('../pages/dashboardPage');
const { ProfilePage } = require('../pages/profilePage');

test('Update full profile', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  const profilePage = new ProfilePage(page);

  // 1️ Login
  await loginPage.goto();
  await loginPage.login('neel@gmail.com', 'Neel@123');

  // 2️⃣ Go to profile page
  await dashboardPage.gotoProfile();

  // 3️⃣ Wait for profile page
  await profilePage.waitForProfilePage();

  // 4️⃣ Click Edit
  await profilePage.clickEdit();

  // 5️⃣ Fill personal info
  await profilePage.updatePersonalInfo(
    'Neel',
    'neel@gmail.com',
    '8998674532'
  );

  await profilePage.updateStoreInfo(
  'Neel Store',
  'store@gmail.com',
  '9999999999',
  'MG Road',
  'Pune',
  'Maharashtra',
  'India'
);
  // 6️⃣ Save changes
  await profilePage.clickUpdate();

  // Optional: wait 2 seconds to see the result
  await page.waitForTimeout(2000);
});
