const fs = require('fs');
const path = require('path');
const { expect } = require("@playwright/test");

class AllBookPage {
    constructor(page) {
        this.page = page;

        this.header = page.getByText("All Bookings");
        this.allbook = page.getByRole("link", { name: "All Bookings" });

        this.searchbox = page.getByPlaceholder("Search by any field…");

        this.table = page.locator("table");
        this.rows = page.locator("tbody tr");

        this.emptyMsg = page.locator("text=/no.*booking.*display/i");

        this.downloadBtn = page.getByRole("button", { name: "Download Excel" });
     this.update=page.getByRole("button",{"name":"Update Status"});
     this.submit=page.getByRole("button",{"name":"Submit"});
    }

    async verifyPageLoaded() {
        await expect(this.header).toContainText("All Bookings");
        await expect(this.searchbox).toBeVisible();
        await expect(this.table).toBeVisible();
    }

    async getBookingCountFromUI() {
        const text = await this.header.textContent();
        const match = text.match(/\((\d+)\)/);
        return match ? parseInt(match[1]) : 0;
    }

    async getRowCount() {
        return await this.rows.count();
    }

    async verifyCountAndData() {
        const uiCount = await this.getBookingCountFromUI();
        const rowCount = await this.getRowCount();

        console.log(`UI Count: ${uiCount}, Table Rows: ${rowCount}`);

        expect(rowCount).toBe(uiCount);

        if (uiCount === 0) {
            await expect(this.emptyMsg).toBeVisible();
        } else {
            await expect(this.rows.first()).toBeVisible();
        }
    }

    async search(query) {
        await this.searchbox.fill(query);
    }

    async clearSearch() {
        await this.searchbox.fill("");
    }

    async verifySearchResult(query) {
        const count = await this.getRowCount();

        if (count > 0) {
            await expect(this.rows.first()).toContainText(query);
        } else {
            await expect(this.emptyMsg).toBeVisible();
        }
    }

    async verifyInvalidSearch() {
        await expect(this.emptyMsg).toBeVisible();
    }

    async searchLargeInput() {
        await this.searchbox.fill("A".repeat(100));
    }

    async verifyActionButtons() {
        const count = await this.getRowCount();

        if (count > 0) {
            await expect(this.rows.first().locator("button")).toBeVisible();
        }
    }

    // =========================
    // 👁 VIEW UNPAID BOOKING (FIXED)
    // =========================
    async clickViewUnpaidBooking() {
        const count = await this.rows.count();

        for (let i = 0; i < count; i++) {
            const row = this.rows.nth(i);

            // ✅ FIXED INDEX (Status = 4 from your table)
            const status = await row.locator("td").nth(4).textContent();

            if (!status) continue;

            if (status.trim().toLowerCase() === "unpaid") {

                console.log(`Unpaid booking found at row ${i}`);

                // ✅ safest click (view icon)
                await row.locator("button:has(svg)").click();

                return;
            }
        }

        throw new Error("No unpaid booking found");
    }

    async verifyViewPageOpened() {
    await expect(this.page).toHaveURL(/\/booking-management\/all-bookings\/.+/);
    await expect(this.page.getByText("Booking Details")).toBeVisible();
}

    // =========================
    // 📥 DOWNLOAD EXCEL
    // =========================
    async downloadExcel() {
        const downloadPromise = this.page.waitForEvent("download");
        await this.downloadBtn.click();

        const download = await downloadPromise;

        const fileName = await download.suggestedFilename();
        const downloadsDir = path.join(process.cwd(), "tests", "downloads");

        fs.mkdirSync(downloadsDir, { recursive: true });

        const savePath = path.join(downloadsDir, fileName);
        await download.saveAs(savePath);

        return savePath;
    }
    async updateStatus(){
        await this.update.click();
    }

    async submitStatus(){
        await this.submit.click();
    }
}

module.exports = { AllBookPage };