const { test, expect } = require("@playwright/test");
const { provservicemanPage } = require("../pages/provservicemanPage");
const { provdashPage } = require("../pages/provdashPage");
const { provLogPage } = require("../pages/provlogPage");
const { servicemanlistPage } = require("../pages/servicemanlistPage");
test.describe("serviceman", () => {

  let log, dash, serv, service;

  test.beforeEach(async ({ page }) => {
    log = new provLogPage(page);
    dash = new provdashPage(page);
    serv = new provservicemanPage(page);
    service = new servicemanlistPage(page);

    await log.goto();
    await log.login("neel@gmail.com", "Neel@123");
    await log.clicksignin();

    await expect(page).toHaveURL("https://biz-booster-provider-panel.vercel.app/", { timeout: 15000 });
  });
  
  test("serviceman view", async ({ page }) => {
    await serv.clickserviceMan();
    await serv.clickservicemandetails();

    // 🔹 Validate table
    await expect(service.firstRow).toBeVisible();

    // 🔹 Search
    await service.search("Rahul");
    await expect(service.firstRow).toContainText("Rahul");

    // 🔹 View
    await service.clickView();
    await page.goBack();

    // 🔹 Edit
    await service.clickEdit();
    await page.goBack();

    // 🔹 Delete with alert
    page.on("dialog", async (dialog) => {
      await dialog.accept();
    });

    await service.clickDelete();
  });

});