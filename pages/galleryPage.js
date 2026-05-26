class galleryPage {
  constructor(page) {
    this.page = page;

    this.galleryMenu = page.getByRole('button', { name: 'Gallery' });
    this.addGallery = page.getByRole('link', { name: 'Add Gallery' });
    this.gallList = page.getByRole('link', { name: 'Gallery List' });

    this.cards = page.locator("div.border.rounded.shadow");

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

  async list() {
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

  async handleDialogs() {
    this.page.on("dialog", async (dialog) => {
      console.log("Dialog:", dialog.message());
      await dialog.accept();
    });
  }

  async deleteImageByIndex(index) {
    const card = this.cards.nth(index);
    await card.locator("button", { hasText: "Delete" }).click();
  }

 async replaceImageByIndex(index, filePath) {

  const card = this.cards.nth(index);

  const fileInput = card.locator(
    'input[type="file"]'
  );

  await fileInput.setInputFiles(filePath);

  await card
    .getByRole("button", { name: "Replace" })
    .click();
}

async getImageSrcByIndex(index) {

  const card = this.cards.nth(index);

  return await card
    .locator("img")
    .getAttribute("src");
}
}

module.exports = { galleryPage };