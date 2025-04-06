const { test, expect } = require('@playwright/test');

test('Header is visible', async ({ page }) => {
  await page.goto('https://magento.softwaretestingboard.com/');
  const header = await page.locator('header');
  await expect(header).toBeVisible();
});
