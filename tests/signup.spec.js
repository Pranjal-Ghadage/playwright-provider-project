const { test, expect } = require('@playwright/test');
const { SignupPage } = require('../pages/signupPage');

test('register test using POM', async ({ page }) => {
  const signupPage = new SignupPage(page);

  await signupPage.goto();

  // ---------------- Signup ----------------
  await signupPage.signup('Sami', 'sami@gmail.com', '9081234567', 'Sami@123','Sami@123');

  // ---------------- Store Info ----------------
  await signupPage.store(
    'steels',
    'steel@gmail.com',
    '9086784532',
    'nigdi',
    'pune',
    'maharashtra',
    'india'
  );

  // ---------------- Module & Zone ----------------
  await signupPage.selectModuleById('6822dfefe8235364b35df1a5'); // legal
  await signupPage.selectZone('Maharashtra'); 
  await expect(signupPage.moduleDropdown).not.toHaveValue(''); 
  await expect(signupPage.zoneDropdown).not.toHaveValue('');

  // ---------------- Upload Files ----------------
  await signupPage.uploadLogoAndCover();

  // ---------------- Save Store ----------------
  await signupPage.saveStoreInfo();

  // ---------------- Verify Signup Complete ----------------
  await expect(page).toHaveURL('https://provider.fetchtrue.com/signup');
});
