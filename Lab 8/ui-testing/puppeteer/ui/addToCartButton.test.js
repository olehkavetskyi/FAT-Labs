const { launch } = require('puppeteer');

describe('UI Tests for E-Commerce Website', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await launch({ headless: false });
        page = await browser.newPage();
        await page.goto('https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html');
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Page title should be correct', async () => {
        const title = await page.title();
        expect(title).toBe('Jackets - Tops - Men');
    });

    test('Product grid should be visible', async () => {
        const productGrid = await page.$('.products-grid');
        expect(productGrid).not.toBeNull();
    });

    test('There should be products listed', async () => {
        const products = await page.$$('.products-grid .product-item');
        expect(products.length).toBeGreaterThan(0);
    });

    test('Sorting functionality should work', async () => {
        await page.select('.sorter-options', 'price');
        await page.waitForSelector('.price');  
        const prices = await page.$$eval('.price', elements =>
          elements.map(el => parseFloat(el.textContent.replace('$', '')))
        );
      });
      
      test('Filtering by size should work', async () => {
        await page.click('.filter-options-title');
      
        await page.waitForSelector('div[aria-label="M"]', { visible: true });
        await page.click('div[aria-label="M"]');
        
        await page.waitForSelector('.products-grid .product-item'); 
        const filteredProducts = await page.$$('.products-grid .product-item');
    });
});
