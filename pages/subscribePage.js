const { expect } = require('@playwright/test');

class SubscribeServicePage {
  constructor(page) {
    this.page = page;

    // Dropdowns
    this.moduleDropdown = page.locator('select[name="moduleId"]');
    this.categoryDropdown = page.locator('select[name="categoryId"]');
    this.subCategoryDropdown = page.locator('select[name="subCategoryId"]');

    this.allServicesSection = page.getByText('All Services');
  }

  async goto() {
    await this.page.goto(
      'https://provider.fetchtrue.com/service-management/available-services'
    );
    await this.page.waitForLoadState('networkidle');
    await expect(this.allServicesSection).toBeVisible();
  }

  async selectModule(module) {
    await this.moduleDropdown.selectOption({ label: module });
    await this.page.waitForTimeout(1000);
  }

  async selectCategory(category) {
    await this.categoryDropdown.selectOption({ label: category });
    await this.page.waitForTimeout(1000);
  }

  // 🔥 AUTO HANDLE SUBCATEGORY
  async handleSubCategoryIfPresent(subCategory) {
    if (await this.subCategoryDropdown.isVisible()) {
      const optionsCount = await this.subCategoryDropdown.locator('option').count();

      // If dropdown has real options
      if (optionsCount > 1) {
        await this.subCategoryDropdown.selectOption({ label: subCategory });
        await this.page.waitForTimeout(1000);
        return true;
      }
    }
    return false;
  }

  // 🔥 Subscribe by Service Name
  async subscribeService(serviceName) {
    const serviceCard = this.page.locator('div', {
      has: this.page.getByText(serviceName, { exact: true })
    });

    const subscribeBtn = serviceCard.locator('button:has-text("Subscribe")');

    await expect(subscribeBtn).toBeVisible();
    await subscribeBtn.click();
  }

  async verifySubscribed(serviceName) {
    const serviceCard = this.page.locator('div', {
      has: this.page.getByText(serviceName, { exact: true })
    });

    await expect(
      serviceCard.locator('button:has-text("Subscribed")')
    ).toBeVisible();
  }
}

module.exports = { SubscribeServicePage };
