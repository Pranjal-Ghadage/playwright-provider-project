class DashboardPage {
  constructor(page) {
    this.page = page;

    this.userMenu = page.locator('button.dropdown-toggle:has(img[alt="User"])');
    this.profileMenu = page.getByText('My profile');
    this.settingsMenu = page.getByText('Account settings');
    this.logoutButton = page.getByText('Sign out');
  }

  // ✅ correct dashboard verification
  async verifyDashboard() {
    await expect(this.userMenu).toBeVisible({ timeout: 10000 });
  }

  async gotoProfile() {
    await this.userMenu.click();
    await this.profileMenu.click();
  }

  async gotoAccount() {
    await this.userMenu.click();
    await this.settingsMenu.click();
  }

  async logout() {
    await this.userMenu.click();
    await this.logoutButton.click();
  }
}

module.exports = { DashboardPage };
