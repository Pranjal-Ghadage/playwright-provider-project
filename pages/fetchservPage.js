class fetchservPage{
    constructor(page){
        this.page=page;
        this.whyserv=page.getByText("Why This Service");
        this.add = page.getByRole("link", { name: "Add", exact: true });
         this.moduleDropdown = page.locator("select");
    }
    async gotoserv(){
        await this.whyserv.click();
        await this.add.click();

    }

    async select() {
  await this.moduleDropdown.selectOption({ label: "Franchise" });
}
}module.exports={fetchservPage};