class logoutpage
{
  constructor (page)
  {
    this.page=page;
        this.logoutLink = page.locator("a[href='/logout']");

  }
  async logout() {
    await this.logoutLink.click();
            await this.page.waitForTimeout(3000);

  }
}
module.exports={logoutpage};