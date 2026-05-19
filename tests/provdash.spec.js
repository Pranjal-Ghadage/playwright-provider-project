const{test,expect}=require("@playwright/test");
const{provdashPage}=require("../pages/provdashPage");
const { provLogPage } = require("../pages/provlogPage");


test.describe("provider dashboard",()=>{
 let log, dash;

 test.beforeEach(async({page})=>{
    log=new provLogPage(page);
    dash=new provdashPage(page);

     await log.goto();
  });

  // ✅ VALID LOGIN
  test("valid login", async ({ page }) => {
   await log.login("neel@gmail.com", "Neel@123");
   await log.clickRememberMe();
   await log.clicksignin();
   await expect(page).toHaveURL("https://provider.fetchtrue.com/",{timeout:30000});
   await expect(dash.dashboardText).toBeVisible();
   await expect(dash.logo).toBeVisible();
   
          // Check menus
  await expect(dash.booking).toBeVisible();
  await expect(dash.service).toBeVisible();
  await expect(dash.user).toBeVisible();
  await expect(dash.gallery).toBeVisible();
  await expect(dash.promotion).toBeVisible();
  await expect(dash.account).toBeVisible();
  });

 
});
