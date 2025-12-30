const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test('login test using POM', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('mahi@gmail.com', 'mahi@123'); 

    // check if login successful
    await expect(page).toHaveURL('https://provider.fetchtrue.com/');
});
