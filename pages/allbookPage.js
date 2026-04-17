const fs = require('fs');
const path = require('path');
const { expect } = require("@playwright/test");

class AllBookPage {
    constructor(page) {
        this.page = page;

        // ✅ Header (with count)
        this.header=page.getByText("All Bookings");
        this.allbook=page.getByRole("link", {name: "All Bookings"});

        // ✅ Search
        this.searchbox = page.getByPlaceholder("Search by any field…");

        // ✅ Table
        this.table = page.locator("table");
        this.rows = page.locator("tbody tr");

        // ✅ Empty message
        this.emptyMsg = page.locator("text=/no.*booking.*display/i");

        // ✅ Download
        this.downloadBtn = page.getByRole("button", { name: "Download Excel" });
    }

    // =========================
    // ✅ PAGE VALIDATION
    // =========================
    async verifyPageLoaded() {
        await expect(this.header).toContainText("All Bookings");
        await expect(this.searchbox).toBeVisible();
        await expect(this.table).toBeVisible();
    }

    // =========================
    // ✅ COUNT FROM UI
    // =========================
    async getBookingCountFromUI() {
        const text = await this.header.textContent();
        const match = text.match(/\((\d+)\)/);
        return match ? parseInt(match[1]) : 0;
    }

    // =========================
    // ✅ ROW COUNT
    // =========================
    async getRowCount() {
        return await this.rows.count();
    }

    // =========================
    // ✅ COUNT + TABLE VALIDATION
    // =========================
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

    // =========================
    // 🔍 SEARCH
    // =========================
    async search(query) {
        await this.searchbox.fill(query);
    }

    async clearSearch() {
        await this.searchbox.fill("");
    }

    // ✅ VALID SEARCH
    async verifySearchResult(query) {
        const count = await this.getRowCount();

        if (count > 0) {
            await expect(this.rows.first()).toContainText(query);
        } else {
            await expect(this.emptyMsg).toBeVisible();
        }
    }

    // ❌ INVALID SEARCH
    async verifyInvalidSearch() {
        await expect(this.emptyMsg).toBeVisible();
    }

    // ⚠️ EDGE: Large input
    async searchLargeInput() {
        const longText = "A".repeat(100);
        await this.searchbox.fill(longText);
    }

    // =========================
    // 🔘 ACTION BUTTONS
    // =========================
    async verifyActionButtons() {
        const count = await this.getRowCount();

        if (count > 0) {
            await expect(this.rows.first().locator("button")).toBeVisible();
        }
    }

    // =========================
    // 👁 VIEW BOOKING
    // =========================
    async clickViewFirstBooking() {
        const count = await this.getRowCount();

        if (count > 0) {
            await this.rows.first().locator("button").first().click();
        }
    }

    async verifyViewPageOpened() {
        await expect(this.page).toHaveURL(/view|details/);
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
}

module.exports = { AllBookPage };