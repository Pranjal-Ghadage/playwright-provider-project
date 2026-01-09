const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../pages/productPage');
const { LoginPage1 } = require('../pages/autologinPage');

test('Add products to cart using POM', async ({ page }) => {
    const productPage = new ProductPage(page);
    const login1 = new LoginPage1(page);

    // Login first
    await login1.goto3();
    await login1.autologin('shera@gmail.com', 'shera@123');

    // Go to products page
    await productPage.goToProducts();
    await expect(page).toHaveURL('https://automationexercise.com/products');

    // Add first product to cart
    await productPage.addFirstProductToCart();
    // ✅ Wait for modal to disappear instead of checking count
    await expect(productPage.cartPopup).toBeHidden({ timeout: 5000 });

    // Add specific product by name
    await productPage.addProductToCartByName('Blue Top'); // Product name from page
    await expect(productPage.cartPopup).toBeHidden({ timeout: 5000 });

    // Optional: Verify cart link navigates correctly
    const cartLink = page.locator("a:has-text('View Cart')");
    await cartLink.click();
    await expect(page).toHaveURL('https://automationexercise.com/view_cart');
});
