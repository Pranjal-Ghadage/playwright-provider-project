class AutoSignupPage2 {
  constructor(page) {
    this.page = page;

    // Account info
    this.autousername = page.locator('#name');
    this.autoemail = page.locator('#email');
    this.autopassword = page.locator('#password');

    // Address info
    this.firstname = page.locator('#first_name');
    this.lastname = page.locator('#last_name');
    this.company = page.locator('#company');
    this.address = page.locator('#address1');
    this.address2 = page.locator('#address2');
    this.state = page.locator('#state');
    this.city = page.locator('#city');
    this.zipcode = page.locator('#zipcode');
    this.mobileno = page.locator('#mobile_number');

    // Title radio buttons
    this.mrRadio = page.locator('#id_gender1');
    this.mrsRadio = page.locator('#id_gender2');

    // DOB dropdowns
    this.dayDropdown = page.locator('#days');
    this.monthDropdown = page.locator('#months');
    this.yearDropdown = page.locator('#years');

    // Checkboxes
    this.newsletterCheckbox = page.locator('#newsletter');
    this.optinCheckbox = page.locator('#optin');

    // Country dropdown
    this.countryDropdown = page.locator('#country');

    this.accountbutton = page.locator('button:has-text("Create Account")');

  }

  async goto2() {
    await this.page.goto('https://automationexercise.com/signup');
  }

  async selectTitle(title) {
  if (title === 'Mrs') {
    await this.page.locator('label[for="id_gender2"]').waitFor({ state: 'visible' });
    await this.page.locator('label[for="id_gender2"]').click();
  } else if (title === 'Mr') {
    await this.page.locator('label[for="id_gender1"]').waitFor({ state: 'visible' });
    await this.page.locator('label[for="id_gender1"]').click();
  }

  }

   // ✅ Get pre-filled Name
  async getName() {
    return await this.autousername.inputValue();
  }

  // ✅ Get pre-filled Email
  async getEmail() {
    return await this.autoemail.inputValue();
  }

  // Fill only password
  async fillPassword(password) {
    await this.autopassword.fill(password);
  }

  
  async addressinfo(firstname, lastname, company, address, address2, state, city, zipcode, mobileno) {
    await this.firstname.fill(firstname);
    await this.lastname.fill(lastname);
    await this.company.fill(company);
    await this.address.fill(address);
    await this.address2.fill(address2);
    await this.state.fill(state);
    await this.city.fill(city);
    await this.zipcode.fill(zipcode);
    await this.mobileno.fill(mobileno);

    // ✅ Always select India
    await this.countryDropdown.selectOption({ label: 'India' });
  }

  async selectDOB(day, month, year) {
    await this.dayDropdown.selectOption({ label: day });
    await this.monthDropdown.selectOption({ label: month });
    await this.yearDropdown.selectOption({ label: year });
  }

  async selectCheckboxes(newsletter = false, optin = false) {
    if (newsletter) await this.newsletterCheckbox.check();
    if (optin) await this.optinCheckbox.check();
  }

  async clickUpdate() {
    await this.accountbutton.click();
            await this.page.waitForTimeout(3000);

  }
  
}

module.exports = { AutoSignupPage2 };
