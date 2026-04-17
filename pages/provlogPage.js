const { expect } = require("@playwright/test");

class provLogPage {
    constructor(page){
        this.page=page;
        this.username=page.locator("//input[@placeholder='info@gmail.com']");
        this.password=page.locator("//input[@placeholder='Enter your password']");
        this.signbutton=page.locator("//button[normalize-space()='Sign in']");
        this.dashboard=page.locator("text=Dashboard");

    }
    async goto(){
        await this.page.goto("https://biz-booster-provider-panel.vercel.app/signin");
    }
    async login(username,password){
        await this.username.fill(username);
        await this.password.fill(password);
    }

    async clicksignin() {
        await this.signbutton.click();
    }

    
     // ✅ Handle alert
  async handleLoginAlert(expectedMessage) {
    this.page.on("dialog", async (dialog) => {
      await dialog.accept();
      if (expectedMessage) {
        console.log(dialog.message());
      }
    });
  }
  // ✅ Browser validation (empty field)
  async verifyRequiredField(locator) {
    await expect(locator).toHaveAttribute("required", "");
  }

  // ✅ Email format validation
  async verifyEmailFieldType() {
    await expect(this.username).toHaveAttribute("type", "email");
  }


};module.exports={provLogPage};