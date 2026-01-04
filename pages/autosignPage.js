const { waitForDebugger } = require("node:inspector");

class AutoSignupPage                          //AutoSignup is class
{
    constructor(page)                     //page is fixture
    {
        this.page=page;                     //initializing var inside constructor
        this.username='//input[@placeholder="Name"]';            //adding loc to fields
        this.email='//input[@data-qa="signup-email"]';
        this.signupbutton='//button[normalize-space()="Signup"]';
        
    }

    async goto1()                 //goto is fun
    {
        await this.page.goto("https://automationexercise.com/login");
    }

    async signup(username,email)         //signup is fun
    {
        await this.page.fill(this.username,username);
        await this.page.fill(this.email,email);
        await this.page.click(this.signupbutton);
        await this.page.waitForTimeout(3000);

    }

   
}
module.exports =  {AutoSignupPage};        //exporting class