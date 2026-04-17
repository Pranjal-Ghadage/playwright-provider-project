const {test, expect} = require ("@playwright/test");
const {fetchlogPage} =require("../pages/fetchlogPage");
const {fetchservPage} =require("../pages/fetchservPage");



test.describe("Fetchlog Login",()=>{
    let log, serv;
  test.beforeEach("valid login",async({page})=>{
    log = new fetchlogPage(page);
    serv = new fetchservPage(page);
   page.on("dialog",async(d)=>{
  //await page.waitForTimeout(3000); // ⏳ see alert for 3 sec
    await d.accept();
   })
    await log.goto();
    await expect(page).toHaveURL("https://api.fetchtrue.com/signin", { timeout: 20000 });
   
    await log.clickRememberMe(); // ✅ now safe
    await expect(log.rememberMeCheckbox).toBeChecked();
  
    await log.signin("Admin@FetchTrue", "@FetchT2025!Root#");
    await expect(page).toHaveURL("https://api.fetchtrue.com/", { timeout: 20000});
  })

   test("serv add",async({page})=>{
    await serv.gotoserv();
    await expect(page).toHaveURL("https://api.fetchtrue.com/why-just-our-service/add", { timeout: 20000 });
    await serv.select();
    await waitForTimeout(2000);

  })

});