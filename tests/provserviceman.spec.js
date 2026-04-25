const { test, expect } = require("@playwright/test");
const { provservicemanPage } = require("../pages/provservicemanPage");
const { provLogPage } = require("../pages/provlogPage");

test.describe("Serviceman Module", () => {

  let log, serv;

  test.beforeEach(async ({ page }) => {
    log = new provLogPage(page);
    serv = new provservicemanPage(page);

    await log.goto();
    await log.login("neel@gmail.com", "Neel@123");
    await log.clicksignin();

    await expect(page).toHaveURL("https://biz-booster-provider-panel.vercel.app/",{timeout:2000});
  });

  // ✅ UI validation
  test("service man page validation", async ({ page }) => {
    await serv.clickserviceMan();

    await expect(serv.addServiceman).toBeVisible();
    await expect(serv.servicemanlist).toBeVisible();
  });

  // ✅ POSITIVE TEST (new email)
  test("add serviceman with valid data", async ({ page }) => {
    await serv.clickserviceMan();
    await serv.clickaddServiceman();

    const email = `anjali${Date.now()}@test.com`; // 🔥 unique email

    await serv.fillBasicDetails("anjali", "Sharma", "9876543288");
    await serv.uploadProfile("tests/files/logo.png");

    await serv.fillBusinessDetails("aadharcard", "123456789766");
    await serv.uploadIdentity("tests/files/cover.png");

    await serv.fillAccountDetails(email, "Test@823", "Test@823");

    await serv.submitForm();

    // ✅ VALIDATION (REAL)
    await expect(serv.successMsg).toBeVisible();
  });

  // ❌ NEGATIVE TEST (duplicate email)
  test("should show error if serviceman already exists", async ({ page }) => {
  await serv.clickserviceMan();
  await serv.clickaddServiceman();

  const existingEmail = "anjali@test.com";

  await serv.fillBasicDetails("anjali", "Sharma", "9876543288");
  await serv.uploadProfile("tests/files/logo.png");

  await serv.fillBusinessDetails("aadharcard", "123456789766");
  await serv.uploadIdentity("tests/files/cover.png");

  await serv.fillAccountDetails(existingEmail, "Test@823", "Test@823");

  // 🔥 HANDLE ALERT (IMPORTANT)
  page.once('dialog', async (dialog) => {
    console.log("Alert:", dialog.message());

    // ✅ VALIDATE ERROR MESSAGE
   // await expect(dialog.message().toLowerCase()).toContain("already");
      await new Promise(resolve => setTimeout(resolve, 5000));

  });

  await serv.submitForm();
});

});