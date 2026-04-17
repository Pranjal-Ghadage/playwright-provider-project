class galleryPage {
  constructor(page) {
    this.page = page;

    // correct sidebar locators
    this.galleryMenu = page.getByRole('button', { name: 'Gallery' });
    this.addGallery = page.getByRole('link', { name: 'Add Gallery' });
    this.gallList=page.getByRole('link', { name: 'Gallery List' });
    this.cards = page.locator("div.border.rounded.shadow");

    // upload
    this.fileInput = page.locator('input[type="file"]');
    this.uploadBtn = page.getByRole('button', { name: 'Upload' });
    
    this.successMsg = page.locator('text=success');
    this.errorMsg = page.locator('text=invalid');
  }

  async gotogallery() {
    await this.galleryMenu.click();
  }

  async addgall() {
    await this.addGallery.click();
  }
  async list(){
    await this.gallList.click();
  }

  async uploadImage(filePath) {
    await this.fileInput.setInputFiles(filePath);
    await this.uploadBtn.click();
  }

  async uploadMultiple(files) {
    await this.fileInput.setInputFiles(files);
    await this.uploadBtn.click();
  }
   async getCount() {
    return await this.cards.count();
  }

  async verifyImageAdded(beforeCount) {

    const afterCount = await this.cards.count();

    await expect(afterCount).toBeGreaterThan(beforeCount);
  }
}

module.exports = { galleryPage };