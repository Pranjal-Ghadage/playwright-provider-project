const { test, expect } = require("@playwright/test");
const path = require("path");
const getFile = (fileName) => path.join(__dirname, "files", fileName);
const { provdashPage } = require("../pages/provdashPage");
const { provLogPage } = require("../pages/provlogPage");
const { galleryPage } = require("../pages/galleryPage");

test.describe("provider gallery (dynamic)", () => {

  let log, dash, gall;

  test.beforeEach(async ({ page }) => {
    log = new provLogPage(page);
    dash = new provdashPage(page);
    gall = new galleryPage(page);

    await log.goto();
    await log.login("neel@gmail.com", "Neel@123");
    await log.clicksignin();

    await expect(page).toHaveURL("https://provider.fetchtrue.com/", {timeout:10000});
  });

  // ✅ UPLOAD
  test("upload image", async ({ page }) => {

    await gall.handleDialogs();

    await gall.gotogallery();
    await gall.list();
    await expect(gall.cards.first()).toBeVisible();
    const beforeCount = await gall.getCount();

    await gall.addgall();
    await gall.uploadImage(getFile("png icon.png"));

    await gall.list();
    await expect(gall.cards.first()).toBeVisible();

    const afterCount = await gall.getCount();

    expect(afterCount).toBeGreaterThanOrEqual(beforeCount);  });

  // ✅ DELETE (dynamic index)
  test("delete image by index", async ({ page }) => {

    await gall.handleDialogs();

    await gall.gotogallery();
    await gall.list();

    await expect(gall.cards.first()).toBeVisible();

    const beforeCount = await gall.getCount();

    await gall.deleteImageByIndex(0); // 👈 dynamic

    await expect(async () => {
      const afterCount = await gall.getCount();
      expect(afterCount).toBeLessThan(beforeCount);
    }).toPass();
  });

  // ✅ REPLACE
  test("replace image by index", async ({ page }) => {

    await gall.handleDialogs();
    await gall.gotogallery();
    await gall.list();

    const beforeSrc = await gall.getImageSrcByIndex(1);

    await gall.replaceImageByIndex(1, getFile("png icon.png"));

    await page.waitForTimeout(2000);

    const afterSrc = await gall.getImageSrcByIndex(1);

    expect(afterSrc).not.toBe(beforeSrc);
  });

  // ✅ MULTIPLE UPLOAD
  test("upload multiple images", async ({ page }) => {

    await gall.handleDialogs();
    await gall.gotogallery();
    await gall.addgall();

    await gall.uploadMultiple([
      getFile("cover.png"),
      getFile("logo.png")
    ]);

    await gall.list();
    await expect(gall.cards.first()).toBeVisible();
  });

  // ❌ INVALID FILE
  test("upload invalid file (PDF)", async ({ page }) => {

    await gall.gotogallery();
    await gall.addgall();

    await gall.uploadImage(getFile("provider.doc"));
    //in panel its accept thats why this test fail
    await expect(gall.errorMsg).toBeVisible();
  });

  // ❌ EMPTY UPLOAD
  test("upload without selecting file", async ({ page }) => {

    await gall.gotogallery();
    await gall.addgall();

    await gall.uploadBtn.click();
    //it will fail in panel uploadbtn not showing any msg
    await expect(gall.errorMsg).toBeVisible();
  });

  // ❌ UNSUPPORTED
  test("upload unsupported file format", async ({ page }) => {

    await gall.gotogallery();
    await gall.addgall();

    await gall.uploadImage(getFile("sample.txt"));
    await expect(gall.errorMsg).toBeVisible();
  });

  // ❌ LARGE FILE
  test("upload large image file", async ({ page }) => {

    await gall.gotogallery();
    await gall.addgall();

    await gall.uploadImage(getFile("large.png"));
    await expect(gall.errorMsg).toBeVisible();
  });

  // ❌ DUPLICATE
  test("upload duplicate image", async ({ page }) => {

    await gall.handleDialogs();
    await gall.gotogallery();
    await gall.addgall();

    const file = getFile("png icon.png");

    await gall.uploadImage(file);
    await gall.uploadImage(file);

    await expect(gall.cards.first()).toBeVisible();
  });

  // ❌ REPLACE INVALID
  test("replace with invalid file", async ({ page }) => {

    await gall.gotogallery();
    await gall.list();

    await gall.replaceImageByIndex(0, getFile("sample.pdf"));
    await expect(gall.errorMsg).toBeVisible();
  });

  // ❌ CANCEL DELETE
  test("cancel delete image", async ({ page }) => {

  page.on("dialog", async (dialog) => {
    await dialog.dismiss(); // click Cancel
  });

  await gall.gotogallery();
  await gall.list();

  // store first image/text before delete
  const firstImage = await gall.firstImageName.textContent();

  await gall.deleteImageByIndex(0);

  // verify image still exists
  await expect(gall.firstImageName).toContainText(firstImage);

});

});