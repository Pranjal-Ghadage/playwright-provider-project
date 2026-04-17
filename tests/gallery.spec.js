const { test, expect } = require("@playwright/test");
const { provdashPage } = require("../pages/provdashPage");
const { provLogPage } = require("../pages/provlogPage");
const { galleryPage } = require("../pages/galleryPage");

test.describe("provider gallery", () => {

  let log, dash, gall;

  test.beforeEach(async ({ page }) => {
    log = new provLogPage(page);
    dash = new provdashPage(page);
    gall = new galleryPage(page);

    await log.goto();
    await log.login("neel@gmail.com", "Neel@123");
    await log.clicksignin();

    await expect(page).toHaveURL("https://biz-booster-provider-panel.vercel.app/");
  });

  // ✅ 1. VALID - Single Image Upload
  test("upload single image", async ({ page }) => {
    page.on("dialog", async({d})=>{
         
      await expect(d.message()).toContain("Successfull");
      await page.waitForTimeout(30000);
      await d.accept();
    });
    await gall.gotogallery();
    await gall.list();
       await page.waitForTimeout(30000);
     const beforeCount = await gall.getCount();

    await gall.addgall();
   await page.waitForTimeout(30000);
   await gall.uploadImage("tests/files/cover.png");
   await gall.list();
      await page.waitForTimeout(30000);

   await gall.verifyImageAdded(beforeCount);


  });
/*
  // ✅ 2. VALID - Multiple Images Upload
  test("upload multiple images", async ({ page }) => {

    await gall.gotogallery();
    await gall.addgall();

    await gall.uploadMultiple([
      'tests/images/cover.png',
      'tests/images/logo.png'
    ]);

    await expect(gall.successMsg).toBeVisible();

  });

  // ❌ 3. INVALID - PDF Upload
  test("upload invalid file (PDF)", async ({ page }) => {

    await gall.gotogallery();
    await gall.addgall();

    await gall.uploadImage('tests/files/sample.pdf');

    // error validation (update text based on UI)
    await expect(gall.errorMsg).toBeVisible();

  });
*/
});