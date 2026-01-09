const { test, expect } = require('@playwright/test');
const { AutoSignupPage } = require('../pages/autosignPage');
const { AutoSignupPage2 } = require('../pages/autosign2Page');
//const { logoutpage } = require('../pages/autologoutPage');


test('signup using POM', async ({ page }) => {
  const signup1 = new AutoSignupPage(page);
  const signup2 = new AutoSignupPage2(page);
  //const logout1 =new logoutpage(page);

  // Signup step 1
  await signup1.goto1();
  await signup1.signup('bira', 'bira@gmail.com');
  await expect(page).toHaveURL('https://automationexercise.com/signup');

  // Signup step 2
 // await signup2.goto2();

   await signup2.mrRadio.waitFor({ state: 'visible', timeout: 5000 });


  // Step 2: select title
  await signup2.selectTitle('Mr');
  await expect(signup2.mrRadio).toBeChecked();

  await signup2.fillPassword('bira@123');

  await signup2.selectDOB('10', 'May', '1990');

  // ✅ Check selected DOB
  const selectedDay = await signup2.dayDropdown.locator('option:checked').textContent();
  const selectedMonth = await signup2.monthDropdown.locator('option:checked').textContent();
  const selectedYear = await signup2.yearDropdown.locator('option:checked').textContent();

  expect(selectedDay).toBe('10');
  expect(selectedMonth).toBe('May');
  expect(selectedYear).toBe('1990');

  // Check checkboxes
  await signup2.selectCheckboxes(true, true);
  await expect(signup2.newsletterCheckbox).toBeChecked();
  await expect(signup2.optinCheckbox).toBeChecked();

  await signup2.addressinfo(
    'bira',
    'pawar',
    'dell',
    'vanaz kothrud',
    'kothrud pune',
    'maharashtra',
    'pune',
    '413098',
    '9999900989'
  );

  // ✅ Verify country dropdown
  const selectedCountry = await signup2.countryDropdown.locator('option:checked').textContent();
  expect(selectedCountry).toBe('India');

  await signup2.clickUpdate();
await expect(page).toHaveURL('https://automationexercise.com/account_created');
/*
await logout1.logout();
await expect(page).toHaveURL('https://automationexercise.com/login');
*/
});
