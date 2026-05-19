class ProfilePage {
  constructor(page) {
    this.page = page;

    this.userImage = page.getByAltText('User');
    this.profileHeading = page.getByText('Profile');

    // ---------- EDIT BUTTON ----------
    this.editButton = page.getByRole('button', { name: /Edit/i }).first();

    // ---------- PERSONAL INFO ----------
    this.nameInput = page.getByPlaceholder('Full Name', { exact: true });
    this.emailInput = page.getByPlaceholder('Email', { exact: true });
    this.phoneInput = page.getByPlaceholder('Phone', { exact: true });

    // ---------- STORE INFO ----------
    this.storeNameInput = page.getByPlaceholder('Store Name', { exact: true });
    this.storeEmailInput = page.getByPlaceholder('Store Email', { exact: true });
    this.storePhoneInput = page.getByPlaceholder('Store Phone', { exact: true });
    this.addressInput = page.getByPlaceholder('Address', { exact: true });
    this.cityInput = page.getByPlaceholder('City', { exact: true });
    this.stateInput = page.getByPlaceholder('State', { exact: true });

    // Country dropdown
    this.countryDropdown = page.locator('select');

    // ---------- UPDATE BUTTON ----------
    this.updateButton = page.getByRole('button', { name: /Update Profile/i });
  }

  // ---------- WAIT FOR PROFILE PAGE ----------
  async waitForProfilePage() {
    await this.userImage.click();
    await this.profileHeading.click();
  }

  // ---------- CLICK EDIT ----------
  async clickEdit() {
    await this.editButton.click();

    // wait for first field to confirm edit mode
    await this.nameInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  // ---------- UPDATE PERSONAL INFO ----------
  async updatePersonalInfo(name, email, phone) {
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.phoneInput.fill(phone);
  }

  // ---------- UPDATE STORE INFO ----------
  async updateStoreInfo(storeName, storeEmail, storePhone, address, city, state, country) {
    await this.storeNameInput.fill(storeName);
    await this.storeEmailInput.fill(storeEmail);
    await this.storePhoneInput.fill(storePhone);
    await this.addressInput.fill(address);
    await this.cityInput.fill(city);
    await this.stateInput.fill(state);

    // Select country only if provided
    // Select country only if provided AND not India (default)
if (country && country !== 'India') {
  await this.countryDropdown.selectOption({ label: country });
}

  }

  // ---------- CLICK UPDATE ----------
  async clickUpdate() {
    await this.updateButton.click();
  }
}

module.exports = { ProfilePage };
