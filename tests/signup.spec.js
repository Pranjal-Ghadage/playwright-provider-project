const {test,expect}= require("@playwright/test");
const {signupPage}= require("../pages/signupPage");

test.describe("signup tests",()=>{
	let sign;

    test("Registration",async({page})=>{
      sign=new signupPage(page);
      await sign.goto();
      await sign.registration(
        "sayali",
        "sayali@test.com",
        "9098086890",
        "Sayali@123",
        "Sayali@123"
      )
      await page.waitForTimeout(1000);
await expect(page.locator("text=Store Information"))
  .toBeVisible();

// ✅ optional message check (loose)
await expect(page.getByText("Registration", { exact: false }))
  .toBeVisible();

});
});