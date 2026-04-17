const { test, expect } = require("@playwright/test");
const { provservicemanPage } = require("../pages/provservicemanPage");
const { provdashPage } = require("../pages/provdashPage");
const { provLogPage } = require("../pages/provlogPage");

test.describe("serviceman", () => {

  let log, dash, serv;

  test.beforeEach(async ({ page }) => {
    log = new provLogPage(page);
    dash = new provdashPage(page);
    serv = new provservicemanPage(page);

    await log.goto();
    await log.login("neel@gmail.com", "Neel@123");
    await log.clicksignin();

    await expect(page).toHaveURL("https://biz-booster-provider-panel.vercel.app/");
  });
 //display serviceman pages
  test("service man page validation", async ({ page }) => {
    await serv.clickserviceMan();

    await expect(serv.addServiceman).toBeVisible();
    await expect(serv.servicemanlist).toBeVisible();
  });
//add serviceman
  test("add serviceman with valid data", async ({ page }) => {
    await serv.clickserviceMan();
    await serv.clickaddServiceman();

    await serv.fillBasicDetails("anjali", "Sharma", "9876543288");
    await serv.uploadProfile("tests/files/logo.png");

    await serv.fillBusinessDetails("aadharcard", "123456789766");
    await serv.uploadIdentity("tests/files/cover.png");

    await serv.fillAccountDetails("anjali@test.com", "Test@823", "Test@823");

    // ✅ Handle alert AFTER submit, before validation
    page.on('dialog', async (dialog) => {
      console.log("Alert:", dialog.message());
      await expect(dialog.message()).toContain("Serviceman added successfully!");
      await dialog.accept();
    });

    await serv.submitForm();

    // ✅ Validation (you can improve this)
        await expect(page).toHaveURL("https://biz-booster-provider-panel.vercel.app/user-management/add-serviceman");
  });
/*
  test(" serviceman list", async ({ page }) => {
    await serv.clickserviceMan();
    await serv.clickServicemandetails();
    await expect(page).toHaveURL("https://biz-booster-provider-panel.vercel.app/user-management/serviceman-list");

  }); 
  */
});