
const fs = require('fs');
const { test, expect } = require("@playwright/test");
const{bookingPage} =require("../pages/bookingPage");
const { provLogPage } = require("../pages/provlogPage");
const {AllBookPage} = require("../pages/allbookPage");

test.describe("booking",()=>{
   let log, book, allbook;

   test.beforeEach(async({page})=>{
    log = new provLogPage(page);
    book = new bookingPage(page);
    allbook = new AllBookPage(page);
    await log.goto();
    await log.login("neel@gmail.com", "Neel@123");
    await log.clicksignin();
    await expect(page).toHaveURL("https://biz-booster-provider-panel.vercel.app/", { timeout: 20000 });
    await expect(log.dashboard).toBeVisible({ timeout: 30000 });

   })

    test("Page + Count validation", async ({ page }) => {
        await book.gotobooking();
        await book.clickallbookings();

        await allbook.verifyPageLoaded();
        await allbook.verifyCountAndData();
        await page.pause();
    });

    test("Search valid", async ({ page }) => {
        await book.gotobooking();
        await book.clickallbookings();

        await allbook.search("FTB000089");
        await allbook.verifySearchResult("FTB000089");
    });

    test("Search invalid", async ({ page }) => {
        await book.gotobooking();
        await book.clickallbookings();

        await allbook.search("INVALID123");
        await allbook.verifyInvalidSearch();
    });

    test("View booking", async ({ page }) => {
        await book.gotobooking();
        await book.clickallbookings();
  await expect(book.viewFirstBookingBtn).toBeVisible();
       await allbook.clickViewFirstBooking();
       await allbook.verifyViewPageOpened();
    });

    test("Download Excel", async ({ page }) => {
        await book.gotobooking();
        await book.clickallbookings();

        const filePath = await allbook.downloadExcel();
        expect(filePath).toContain(".xlsx");
    });

});