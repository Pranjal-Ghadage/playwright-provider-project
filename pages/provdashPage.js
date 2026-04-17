class provdashPage {
  constructor(page) {
    this.page = page;
    
    // Dashboard elements
    this.dashboardText = page.locator("text=Dashboard");
    this.logo = page.getByRole('link', { name: 'Logo' });
    this.usericon=page.locator("//img[@alt='User']");

    // Main Menus
    this.booking = page.locator("text=Booking Management");
    this.service = page.locator("text=Service management");
    this.user = page.locator("text=User Management");
    this.gallery = page.locator("text=Gallery Management");
    this.promotion = page.locator("text=Promotion Management");
    this.account = page.locator("text=Account Management");
  }
 
  async clicklogo(){
    await this.usericon.click();
  }
  async verifyDashboard() {
    await this.dashboardText.waitFor({ state: 'visible' });
    await this.logo.waitFor({ state: 'visible' });
  }

  async openBooking() {
    await this.booking.click();
  }

  async openUser() {
    await this.user.click();
  }

  async openGallery() {
    await this.gallery.click();
  }

  async openPromotion() {
    await this.promotion.click();
  }

  async openAccount() {
    await this.account.click();
  }
}

module.exports = { provdashPage };