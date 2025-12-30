class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = 'input[placeholder="info@gmail.com"]';   
        this.passwordInput = 'input[placeholder="Enter your password"]';  
        this.loginButton = '//button[normalize-space()="Sign in"]';  
    }

    async goto() {
        await this.page.goto('https://provider.fetchtrue.com/signin'); 
    }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
       // await this.page.waitForLoadState('networkidle'); // wait for navigation

    }
}

module.exports = { LoginPage };
