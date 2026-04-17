const { test, expect } = require("@playwright/test");
const { provLogPage } = require("../pages/provlogPage");
const { provdashPage } = require("../pages/provdashPage");

test.describe("Provider Login", () => {

  let log;
  let dash;

  test.beforeEach(async ({ page }) => {
    log = new provLogPage(page);
    dash = new provdashPage(page);
    await log.goto();
  });

  // ✅ VALID LOGIN
  test("valid login", async ({ page }) => {
    await log.login("neel@gmail.com", "Neel@123");
    await log.clicksignin();
    await expect(page).toHaveURL("https://biz-booster-provider-panel.vercel.app/", { timeout: 20000 });
    await expect(log.dashboard).toBeVisible({ timeout: 30000 });

    //await expect(page.locator("text=Dashboard")).toBeVisible();
  });

  // ❌ INVALID USERNAME
  test("invalid username", async ({ page }) => {
    await log.handleLoginAlert("Login failed");
    await log.login("wrong@gmail.com", "Neel@123");
    await log.clicksignin();
    await page.pause();
  });

  // ❌ INVALID PASSWORD
  test("invalid password", async ({ page }) => {
    await log.handleLoginAlert("Login failed");
    await log.login("neel@gmail.com", "Wrong@123");
    await log.clicksignin();
  });

  // ❌ BOTH WRONG
  test("invalid username and password", async ({ page }) => {
    await log.handleLoginAlert("Login failed");
    await log.login("wrong@gmail.com", "Wrong@123");
    await log.clicksignin();
  });


  // ⚠️ EMPTY USERNAME (Browser validation)
  test("empty username", async({ page }) => {
    await log.login("", "Neel@123");
    await log.clicksignin();

    await log.verifyRequiredField(log.username);
  });

 
  // ⚠️ EMPTY PASSWORD (Browser validation)
  test("empty password", async ({ page }) => {
    await log.login("neel@gmail.com", "");
    await log.clicksignin();

    await log.verifyRequiredField(log.password);
  });

  // ⚠️ BOTH EMPTY
  test("empty username and password", async ({ page }) => {
    await log.login("", "");
    await log.clicksignin();

    await log.verifyRequiredField(log.username);
    await log.verifyRequiredField(log.password);
  });
        
});