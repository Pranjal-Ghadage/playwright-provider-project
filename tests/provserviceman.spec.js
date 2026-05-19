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

    await expect(page).toHaveURL(
      "https://provider.fetchtrue.com/",
      { timeout: 30000 }
    );
  });

  // ✅ UI validation
  test("service man page validation", async ({ page }) => {

    await serv.clickserviceMan();

    await expect(serv.addServiceman).toBeVisible();

    await expect(serv.servicemanlist).toBeVisible();
  });

  
// ✅ POSITIVE TEST
   test("add serviceman with valid data", async ({ page }) => {

  await serv.clickserviceMan();
  await serv.clickaddServiceman();

  // Dynamic data
  const email = `anjali${Date.now()}@test.com`;

  const mobile = `98${Math.floor(Math.random() * 100000000)}`;

  const aadhar = `${Math.floor(
    100000000000 + Math.random() * 900000000000
  )}`;

  // ✅ Register dialog handler BEFORE action (IMPORTANT FIX)
  const dialogPromise = page.waitForEvent("dialog");

  // Basic Details
  await serv.fillBasicDetails("anjali", "Sharma", mobile);

  // Upload Profile
  await serv.uploadProfile("tests/files/logo.png");

  // Business Details
  await serv.fillBusinessDetails("aadharcard", aadhar);

  // Upload Identity
  await serv.uploadIdentity("tests/files/cover.png");

  // Account Details
  await serv.fillAccountDetails(email, "Test@823", "Test@823");

  // Submit
  await serv.submitForm();

  // ✅ Handle dialog properly
  const dialog = await dialogPromise;

  console.log("Success Message:", dialog.message());

  expect(dialog.message()).toContain("Serviceman added successfully!");

  await dialog.accept();

  // Navigate to list
  await serv.clickservicemandetails();

  // Search
  const searchBox = page.getByPlaceholder("Search");
  await searchBox.fill(mobile);

  // ✅ Better than waitForTimeout
  const table = page.locator("table");

  await expect(table).toContainText(mobile, {
    timeout: 10000
  });
});


  // ❌ NEGATIVE TEST
  test("should show error if serviceman already exists", async ({ page }) => {

    await serv.clickserviceMan();

    await serv.clickaddServiceman();

    const existingEmail = "anjali@test.com";

    // Basic Details
    await serv.fillBasicDetails(
      "anjali",
      "Sharma",
      "9876543288"
    );

    // Upload Profile
    await serv.uploadProfile(
      "tests/files/logo.png"
    );

    // Business Details
    await serv.fillBusinessDetails(
      "aadharcard",
      "123456789766"
    );

    // Upload Identity
    await serv.uploadIdentity(
      "tests/files/cover.png"
    );

    // Account Details
    await serv.fillAccountDetails(
      existingEmail,
      "Test@823",
      "Test@823"
    );

    // Handle Alert
    page.once("dialog", async (dialog) => {

      console.log(
        "Alert Message:",
        dialog.message()
      );

      // Validation
      expect(
        dialog.message().toLowerCase()
      ).toContain("already");

      // Accept Alert
      await dialog.accept();
    });

    // Submit
    await serv.submitForm();
  });

  // ✅ EMPTY FORM VALIDATION
  test("should focus first name field when form is empty", async ({ page }) => {

    await serv.clickserviceMan();

    await serv.clickaddServiceman();

    // Submit empty form
    await serv.submitForm();

    // Validation
    await expect(serv.firstName).toBeFocused();
  });

});