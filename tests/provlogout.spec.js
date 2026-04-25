const { test, expect } = require("@playwright/test");
const { provLogoutPage } = require("../pages/provlogoutPage");
const { provdashPage } = require("../pages/provdashPage");
const { provLogPage } = require("../pages/provlogPage");

test.describe("provider logout", () => {
  let log;
  let dash;
  let logout;

  test.beforeEach(async ({ page }) => {
    log = new provLogPage(page);
    dash = new provdashPage(page);
    logout = new provLogoutPage(page);
    await log.goto();
  });

  // ✅ VALID LOGIN
  test("valid login", async ({ page }) => {
    await log.login("neel@gmail.com", "Neel@123");
    await log.clicksignin();
    await expect(page).toHaveURL("https://provider.fetchtrue.com/");
  });
/*
  test("profile button", async ({ page }) => {
    await log.login("neel@gmail.com", "Neel@123");
    await log.clicksignin();
    await dash.profilebutton();
    await page.pause();
  });
*/
  test("logout", async ({ page }) => {
    await log.login("neel@gmail.com", "Neel@123");
    await log.clicksignin();
    await expect(page).toHaveURL("https://provider.fetchtrue.com/",{timeout:20000});
   // await dash.profilebutton();
      // this.logo = page.getByRole('link', { name: 'Logo' });
      await dash.clicklogo()  ; 
    await logout.clickSignout();
    await expect(page).toHaveURL("https://provider.fetchtrue.com/signin",{timeout:30000});
  });

});