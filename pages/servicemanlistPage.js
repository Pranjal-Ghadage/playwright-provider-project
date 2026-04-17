class servicemanlistPage {
  constructor(page) {
    this.page = page;

    this.searchBox = page.getByPlaceholder("Search Serviceman");
    this.tableRows = page.locator("tbody tr");
    this.firstRow = page.locator("tbody tr").first();

    this.viewBtn = this.firstRow.locator("button").nth(0);
    this.editBtn = this.firstRow.locator("button").nth(1);
    this.deleteBtn = this.firstRow.locator("button").nth(2);
  }

  async search(name) {
    await this.searchBox.fill(name);
  }

  async clickView() {
    await this.viewBtn.click();
  }

  async clickEdit() {
    await this.editBtn.click();
  }

  async clickDelete() {
    await this.deleteBtn.click();
  }
}

module.exports = { servicemanlistPage };