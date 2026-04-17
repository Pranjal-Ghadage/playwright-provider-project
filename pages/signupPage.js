class signupPage {
  constructor(page){
    this.page=page;
     this.fname = page.locator("input[name='fullName']");
    this.email = page.locator("input[name='email']");
    this.phno = page.locator("input[name='phoneNo']");
    this.pass = page.locator("input[name='password']");
    this.confirmpass = page.locator("input[name='confirmPassword']");
    this.registerbutton=page.locator("//button[normalize-space()='Register']");
    this.successMsg=page.locator("text=Registration successful");
    this.store=page.locator("text=Store Information");

  }
  async goto(){
    await this.page.goto("https://biz-booster-provider-panel.vercel.app/signup");
  }
  async registration(fname,email,phno,pass,confirmpass){
   await this.fname.fill(fname);
   await this.email.fill(email);
   await this.phno.fill(phno);
   await this.pass.fill(pass);
   await this.confirmpass.fill(confirmpass);
   await this.registerbutton.click();
  }
} module.exports={signupPage};