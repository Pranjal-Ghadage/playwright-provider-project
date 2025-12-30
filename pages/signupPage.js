const { expect } = require('@playwright/test');
const path = require('path');

class SignupPage {
  constructor(page) {
    this.page = page;

    // Dropdowns
    this.moduleDropdown = page.locator('select[name="moduleId"]');
    this.zoneDropdown = page.locator('select[name="zoneId"]');

    // File uploads
    this.logoUpload = page.locator('input[name="logo"]');
    this.coverUpload = page.locator('input[name="cover"]');
  }

  async goto() {
    await this.page.goto('https://provider.fetchtrue.com/signup');
    await this.page.waitForLoadState('networkidle');
  }

  async signup(name, email, phone, password,confirmpassword) {
    await this.page.fill('//input[@name="fullName"]', name);
    await this.page.fill('//input[@name="email"]', email);
    await this.page.fill('//input[@name="phoneNo"]', phone);
    await this.page.fill('//input[@name="password"]', password);
    await this.page.fill('//input[@name="confirmPassword"]', confirmpassword);
    await this.page.click('//button[normalize-space()="Register"]');
  }

  async store(storename, storeemail, storephone, address, city, state, country) {
    await this.page.fill('//input[@name="storeName"]', storename);
    await this.page.fill('//input[@name="storeEmail"]', storeemail);
    await this.page.fill('//input[@name="storePhone"]', storephone);
    await this.page.fill('//input[@name="address"]', address);
    await this.page.fill('//input[@name="city"]', city);
    await this.page.fill('//input[@name="state"]', state);
    await this.page.fill('//input[@name="country"]', country);
  }

  // ---------------- Module & Zone ----------------
  async selectModuleById(moduleId) {
    await this.moduleDropdown.selectOption(moduleId);
    await this.page.waitForTimeout(1000); // wait for zone options to load
  }

  async selectZone(zone) {
    await this.zoneDropdown.selectOption({ label: zone });

    // ✅ verify zone selected
    await expect(this.zoneDropdown).not.toHaveValue('');
  }

  // ---------------- Upload Logo & Cover ----------------
  async uploadLogoAndCover() {
    await this.logoUpload.setInputFiles(path.resolve(__dirname, '../tests/files/logo.png'));
    await this.coverUpload.setInputFiles(path.resolve(__dirname, '../tests/files/cover.png'));

    // verify files attached
    await expect(this.logoUpload).toHaveValue(/logo/);
    await expect(this.coverUpload).toHaveValue(/cover/);
  }

  async saveStoreInfo() {
    await this.page.click('//button[normalize-space()="Save Store Info"]');
  }
}

module.exports = { SignupPage };
