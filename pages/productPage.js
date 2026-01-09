// productPage.js
class ProductPage {
    constructor(page) {
        this.page = page;
        this.productLink = page.locator("a[href='/products']");
        this.addToCartButton = page.locator("a.add-to-cart");
        this.cartPopup = page.locator('.modal-content');
        this.continueShoppingButton = page.locator("button:has-text('Continue Shopping')");
    }

    // Navigate to Products page
    async goToProducts() {
        await this.productLink.click();
    }

    // Add first product to cart
    async addFirstProductToCart() {
        await this.addToCartButton.first().click();
        await this.cartPopup.waitFor({ state: 'visible' });
        await this.continueShoppingButton.click();
    }

    // Add product by name
    async addProductToCartByName(productName) {
        const product = this.page.locator(`.productinfo h2:has-text("${productName}")`).first();
        await product.locator("xpath=../..//a[text()='Add to cart']").click();
        await this.cartPopup.waitFor({ state: 'visible' });
        await this.continueShoppingButton.click();
    }
}

module.exports = { ProductPage };
