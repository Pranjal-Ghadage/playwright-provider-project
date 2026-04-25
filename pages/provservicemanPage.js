class provservicemanPage {
  constructor(page) {
    this.page = page;

    this.usermanagement = page.getByText("User Management");
    this.serviceMan = page.getByRole('button', { name: 'Service Man' });
    this.addServiceman = page.locator("text=Add Serviceman");
    this.servicemanlist = page.locator("text=Serviceman List");

    // 🔹 Basic Details
    this.firstName = page.getByPlaceholder("First Name");
    this.lastName = page.getByPlaceholder("Last Name");
    this.phoneNumber = page.getByPlaceholder("Phone Number");
    this.profileUpload = page.locator("input[type='file']").first();

    // 🔹 Business Details
    this.identityType = page.locator("[name='identityType']");
    this.identityNumber = page.getByPlaceholder("Identity Number");
    this.identityUpload = page.locator("input[type='file']").nth(1);

    // 🔹 Account Details
    this.email = page.getByPlaceholder("Email");
    this.password = page.getByPlaceholder("Password", { exact: true });
    this.confirmPassword = page.getByPlaceholder("Confirm Password");

    // 🔹 Submit
    this.submitBtn = page.getByRole('button', { name: 'Submit' });

    // ✅ Messages (IMPORTANT FIX)
    this.successMsg = page.locator("text=Serviceman added successfully!");
    this.errorMsg = page.locator("text=Email already exists");
  }

  async clickserviceMan() {
    await this.usermanagement.click();
    await this.serviceMan.click();
  }

  async clickaddServiceman() {
    await this.addServiceman.click();
  }

  async clickservicemandetails() {
    await this.servicemanlist.click();
  }

  async fillBasicDetails(fname, lname, phone) {
    await this.firstName.fill(fname);
    await this.lastName.fill(lname);
    await this.phoneNumber.fill(phone);
  }

  async uploadProfile(filePath) {
    await this.profileUpload.setInputFiles(filePath);
  }

  async fillBusinessDetails(identityType, identityNumber) {
    await this.identityType.selectOption(identityType);
    await this.identityNumber.fill(identityNumber);
  }

  async uploadIdentity(filePath) {
    await this.identityUpload.setInputFiles(filePath);
  }

  async fillAccountDetails(email, password, confirmPassword) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.confirmPassword.fill(confirmPassword);
  }

  async submitForm() {
    await this.submitBtn.click();
  }
}

module.exports = { provservicemanPage };