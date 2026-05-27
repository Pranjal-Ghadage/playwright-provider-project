const { test, expect } = require("@playwright/test");
const { provLogPage } = require("../pages/provlogPage");
const { AllBookPage } = require("../pages/allbookPage");

test.describe("booking", () => {

    let log, allbook;

    test.beforeEach(async ({ page }) => {

        log = new provLogPage(page);
        allbook = new AllBookPage(page);

        await log.goto();

        await log.login(
            "neel@gmail.com",
            "Neel@123"
        );

        await log.clicksignin();

        await expect(page).toHaveURL(
            "https://provider.fetchtrue.com/",
            { timeout: 20000 }
        );

    });

    test("View booking", async () => {

        await allbook.gotoBooking();

        await allbook.clickAllBookings();

        // await allbook.clickViewUnpaidBooking();

        // await allbook.verifyViewPageOpened();

    });

    test("Search valid", async () => {

        await allbook.gotoBooking();

        await allbook.clickAllBookings();

        await allbook.search("FTB000089");

        await allbook.verifySearchResult(
            "FTB000089"
        );

    });

    test("Search invalid", async () => {

        await allbook.gotoBooking();

        await allbook.clickAllBookings();

        await allbook.search("INVALID123");

        await allbook.verifyInvalidSearch();

    });

    test("Download Excel", async () => {

        await allbook.gotoBooking();

        await allbook.clickAllBookings();

        const filePath =
            await allbook.downloadExcel();

        expect(filePath).toContain(".xlsx");

    });

});