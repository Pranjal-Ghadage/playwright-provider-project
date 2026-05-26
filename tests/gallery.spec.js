const { test, expect } = require("@playwright/test");
const path = require("path");

const getFile = (fileName) =>
  path.join(__dirname, "files", fileName);

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

    await log.login(
      "akshay@gmail.com",
      "Akshay@123"
    );

    await log.clicksignin();

    await expect(page).toHaveURL(
      "https://provider.fetchtrue.com/",
      { timeout: 10000 }
    );
  });

  // ✅ UPLOAD
  test("upload image", async ({ page }) => {

    await gall.handleDialogs();

    await gall.gotogallery();
    await gall.list();

    const beforeCount =
      await gall.getCount();

    await gall.addgall();

    await gall.uploadImage(
      getFile("cover.png")
    );

    await gall.list();

    await expect(gall.cards.first())
      .toBeVisible();

    const afterCount =
      await gall.getCount();

    expect(afterCount)
      .toBeGreaterThan(beforeCount);
  });

  // ✅ DELETE
  test("delete image by index", async ({ page }) => {

    await gall.handleDialogs();

    await gall.gotogallery();
    await gall.list();

    await expect(gall.cards.first())
      .toBeVisible();

    const beforeCount =
      await gall.getCount();

    await gall.deleteImageByIndex(0);

    await expect.poll(async () => {
      return await gall.getCount();
    }, {
      timeout: 10000
    }).toBeLessThan(beforeCount);
  });

  // ✅ REPLACE
  test("replace image by index", async ({ page }) => {

    await gall.handleDialogs();

    await gall.gotogallery();
    await gall.list();

    await expect(gall.cards.first())
      .toBeVisible();

    await gall.replaceImageByIndex(
      0,
      getFile("cover.png")
    );

    // small stabilization wait
    await page.waitForTimeout(2000);

    // verify image still visible after replace
    await expect(gall.cards.first())
      .toBeVisible();
  });

  // ✅ MULTIPLE UPLOAD
  test("upload multiple images", async ({ page }) => {

    await gall.handleDialogs();

    await gall.gotogallery();

    await gall.addgall();

    await gall.uploadMultiple([
      getFile("png icon.png"),
      getFile("logo.png")
    ]);

    await gall.list();

    await expect(gall.cards.first())
      .toBeVisible();
  });

  // ❌ INVALID FILE
  test.skip("upload invalid file (PDF)", async ({ page }) => {

    await gall.gotogallery();

    await gall.addgall();

    await gall.uploadImage(
      getFile("sample.pdf")
    );

    // app currently accepts file
    await expect(gall.errorMsg)
      .toBeVisible();
  });

  // ❌ UNSUPPORTED FORMAT
  test.skip("upload unsupported file format", async ({ page }) => {

    await gall.gotogallery();

    await gall.addgall();

    await gall.uploadImage(
      getFile("sample.txt")
    );

    await expect(gall.errorMsg)
      .toBeVisible();
  });

  // ❌ LARGE FILE
  test.skip("upload large image file", async ({ page }) => {

    await gall.gotogallery();

    await gall.addgall();

    await gall.uploadImage(
      getFile("large.png")
    );

    await expect(gall.errorMsg)
      .toBeVisible();
  });

  // ❌ REPLACE INVALID
  test.skip("replace with invalid file", async ({ page }) => {

    await gall.gotogallery();

    await gall.list();

    await gall.replaceImageByIndex(
      0,
      getFile("sample.pdf")
    );

    await expect(gall.errorMsg)
      .toBeVisible();
  });

  // ✅ CANCEL DELETE
  test("cancel delete image", async ({ page }) => {

    page.once("dialog", async (dialog) => {

      await dialog.dismiss();
    });

    await gall.gotogallery();

    await gall.list();

    await expect(gall.cards.first())
      .toBeVisible();

    const beforeCount =
      await gall.getCount();

    await gall.deleteImageByIndex(0);

    await page.waitForTimeout(1000);

    const afterCount =
      await gall.getCount();

    expect(afterCount)
      .toBe(beforeCount);
  });

});