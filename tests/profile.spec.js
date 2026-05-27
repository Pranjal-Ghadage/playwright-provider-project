const { test, expect } = require('@playwright/test');

const { provLogPage } = require('../pages/provlogPage');
const { provdashPage } = require('../pages/provdashPage');
const { ProfilePage } = require('../pages/profilePage');

test.describe("Profile Module", () => {

  let log, dash, profilePage;

  test.beforeEach(async ({ page }) => {

    log = new provLogPage(page);
    dash = new provdashPage(page);
    profilePage = new ProfilePage(page);

    // ---------- LOGIN ----------
    await log.goto();

    await log.handleLoginAlert();

    await log.login(
      "neel@gmail.com",
      "Neel@123"
    );

    await log.clickRememberMe();

    await log.clicksignin();

    await expect(page).toHaveURL(
      "https://provider.fetchtrue.com/",
      { timeout: 30000 }
    );

    await expect(log.dashboardText).toBeVisible();

    // ---------- GO TO PROFILE ----------
    await profilePage.waitForProfilePage();

    await profilePage.clickEdit();
  });

  // =========================================================
  // ✅ VALID PROFILE UPDATE
  // =========================================================

  test("valid profile update", async ({ page }) => {

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

    
    await profilePage.clickUpdate();

    await page.waitForTimeout(2000);
  });

  // =========================================================
  // ❌ INVALID EMAIL
  // =========================================================

  test("should show error for invalid email", async ({ page }) => {

    await profilePage.updatePersonalInfo(
      'Neel',
      'invalidemail',
      '8998674532'
    );

    await profilePage.clickUpdate();

    await expect(
      page.getByText('Please enter a valid email')
    ).toBeVisible();
  });

  // =========================================================
  // ❌ INVALID PHONE
  // =========================================================

  test("should show error for invalid phone", async ({ page }) => {

    await profilePage.updatePersonalInfo(
      'Neel',
      'neel@gmail.com',
      '12345'
    );

    await profilePage.clickUpdate();

    await expect(
      page.getByText('Phone number must be exactly 10 digits')
    ).toBeVisible();
  });

  // =========================================================
  // ❌ EMPTY FULL NAME
  // =========================================================

 test("should show error for empty full name", async ({ page }) => {

  await profilePage.updatePersonalInfo(
    '',
    'neel@gmail.com',
    '8998674532'
  );

  await profilePage.clickUpdate();

  await expect(
    page.getByTestId('full-name-error')
  ).toBeVisible();
});
  // =========================================================
  // ❌ EMPTY ADDRESS
  // =========================================================

  test("should show error for empty address", async ({ page }) => {

    await profilePage.updateStoreInfo(
      'Neel Store',
      'store@gmail.com',
      '9999999999',
      '',
      'Pune',
      'Maharashtra',
      'India'
    );

    await profilePage.clickUpdate();

    await expect(
  page.getByText('This field is required')
).toBeVisible();
  });

  // =========================================================
  // ❌ INVALID STORE EMAIL
  // =========================================================

  test("should show error for invalid store email", async ({ page }) => {

    await profilePage.updateStoreInfo(
      'Neel Store',
      'invalidemail',
      '9999999999',
      'MG Road',
      'Pune',
      'Maharashtra',
      'India'
    );

    await profilePage.clickUpdate();
await expect(
  page.getByText('Please enter a valid email address')
).toBeVisible();
  });

  // =========================================================
  // ❌ INVALID STORE PHONE
  // =========================================================

  test("should show error for invalid store phone", async ({ page }) => {

    await profilePage.updateStoreInfo(
      'Neel Store',
      'store@gmail.com',
      '123',
      'MG Road',
      'Pune',
      'Maharashtra',
      'India'
    );

    await profilePage.clickUpdate();

    await expect(
  page.getByText('Phone number must be exactly 10 digits')
).toBeVisible();
  });

});