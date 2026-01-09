class LoginPage1{
    constructor(page)
    {
        this.page=page;
        this.email = page.locator("input[data-qa='login-email']");
        this.password=page.locator("input[placeholder='Password']");
        this.loginbutton=page.locator("button[data-qa='login-button']");
 
    }
    async goto3()                 //goto is fun
    {
        await this.page.goto("https://automationexercise.com/login");
    }

    async autologin(email,password)
    {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginbutton.click();
        await this.page.waitForTimeout(2000);
    }
    
}
module.exports={LoginPage1};