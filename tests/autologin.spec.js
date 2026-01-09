const { test, expect } = require('@playwright/test');
const {  LoginPage1} = require('../pages/autologinPage');
const { logoutpage } = require('../pages/autologoutPage');


test("login successfully", async({page})=>{
    const login1= new LoginPage1(page);
    const logout1= new logoutpage(page);
    await login1.goto3();
    await login1.autologin('shera@gmail.com','shera@123');
      await expect(page).toHaveURL('https://automationexercise.com/');

      await logout1.logout() ;
      await expect(page).toHaveURL('https://automationexercise.com/login');


});