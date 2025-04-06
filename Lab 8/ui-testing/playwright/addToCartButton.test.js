const { test, expect } = require('@playwright/test');

test('Add to Cart button exists on first product', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/');
  const addToCartButton = await page.locator('.product-item .action.tocart').first();
  await expect(addToCartButton).toBeVisible();
});
