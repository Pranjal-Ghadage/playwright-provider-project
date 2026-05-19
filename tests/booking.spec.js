const { test, expect } = require("@playwright/test");
const{bookingPage} =require("../pages/bookingPage");
const { provLogPage } = require("../pages/provlogPage");

test.describe("booking",()=>{
   let log, book;

   test.beforeEach(async({page})=>{
    log = new provLogPage(page);
    book = new bookingPage(page);
    await log.goto();
    await log.login("neel@gmail.com", "Neel@123");
    await log.clicksignin();
    await expect(page).toHaveURL("https://provider.fetchtrue.com/", { timeout: 20000 });
    await expect(log.dashboard).toBeVisible({ timeout: 30000 });

   })

   test.skip("All bookings",async({page})=>{
    await book.gotobooking();
    await book.clickallbookings();
    await expect(page).toHaveURL("https://provider.fetchtrue.com/booking-management/all-bookings", { timeout: 20000 });

   })
});
 
