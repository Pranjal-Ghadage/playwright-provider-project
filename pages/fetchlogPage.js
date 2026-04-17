const { expect }= require("@playwright/test");

class fetchlogPage {
    constructor(page){
        this.page = page;
        this.user = page.getByPlaceholder("admin123");
        this.pass = page.getByPlaceholder("Enter your password");
        //this.rememberMeCheckbox = page.getByLabel("Remember me");
      this.rememberMeCheckbox = page.locator("//input[@type='checkbox']");
        this.signinbutton = page.getByRole("button", { name: "Sign in" });
        this.dashboard = page.getByRole("link", { name: "Dashboard" });
    }

    async goto() {
       await this.page.goto("https://api.fetchtrue.com/signin");
    }

    async signin(username, password) 
    {
        await this.user.fill(username);
        await this.pass.fill(password);
        await this.signinbutton.click();
    }

    async clickRememberMe() {
          await this.rememberMeCheckbox.waitFor({ state: "visible" });
  await this.rememberMeCheckbox.check(); // safer than click()
}
}
module.exports={fetchlogPage};