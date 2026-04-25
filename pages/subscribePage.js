const { expect } = require('@playwright/test');

class SubscribeServicePage {
    constructor(page) {
        this.page = page;

        // ✅ safer locator (waits for rows inside table)
        this.rows = page.locator("tbody tr");
        this.table = page.locator("table");
    }

    async goto() {
        await this.page.goto(
            "https://provider.fetchtrue.com/service-management/available-services"
        );

        // ✅ better than networkidle
        await expect(this.table).toBeVisible();
        await expect(this.rows.first()).toBeAttached({ timeout: 15000 });
    }

    async subscribeByIndex(index) {
        const row = this.rows.nth(index);

        await expect(row).toBeVisible({ timeout: 15000 });

        const btn = row.locator('button:has-text("Subscribe")');

        await expect(btn).toBeVisible({ timeout: 10000 });
        await btn.click();
    }

    async unsubscribeByIndex(index) {
        const row = this.rows.nth(index);

        await expect(row).toBeVisible({ timeout: 15000 });

        const btn = row.locator('button:has-text("Unsubscribe")');

        await expect(btn).toBeVisible({ timeout: 10000 });
        await btn.click();
    }
}

module.exports = { SubscribeServicePage };