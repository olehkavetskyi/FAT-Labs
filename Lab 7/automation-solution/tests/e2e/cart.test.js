const { launch } = require('puppeteer');
const { faker } = require('@faker-js/faker');

describe('E2E Tests for Magento Store', () => {
  let browser;
  let page;

  const email = faker.internet.email();
  const password = faker.internet.password();

  beforeAll(async () => {
    browser = await launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('User Registration', async () => {
    await page.goto('https://magento.softwaretestingboard.com/customer/account/create/');

    await page.type('#firstname', faker.person.firstName());
    await page.type('#lastname', faker.person.lastName());
    await page.type('#email_address', email);
    await page.type('#password', password);
    await page.type('#password-confirmation', password);

    await Promise.all([
      page.waitForNavigation(),
      page.click('button[title="Create an Account"]')
    ]);

    const successMessage = await page.$eval('.message-success div', el => el.textContent);
    expect(successMessage).toMatch(/Thank you for registering/);
  }, 30000); 

  test('Search Product', async () => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await page.type('#search', 'jacket');
    await page.keyboard.press('Enter');
  
    await page.waitForSelector('.product-item'); 
    const products = await page.$$('.product-item');
    expect(products.length).toBeGreaterThan(0);
  }, 15000);
  

  test('Add to Cart and Proceed to Checkout', async () => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await page.waitForSelector('.product-item-info a.product-item-photo', { timeout: 10000 });
  
    const productLink = await page.$('.product-item-info a.product-item-photo');
    if (!productLink) {
      throw new Error('Не знайдено товар для додавання в кошик.');
    }
    await productLink.click();
  
    await page.waitForSelector('.swatch-attribute.size .swatch-option', { timeout: 8000 });
    await page.waitForSelector('.swatch-attribute.color .swatch-option', { timeout: 8000 }); 
  
    const sizeOption = await page.$('.swatch-attribute.size .swatch-option');
    if (sizeOption) {
      await sizeOption.click();
      await page.waitForSelector('.swatch-attribute.size .swatch-option.selected', { timeout: 5000 }); 
    }
  
    const colorOption = await page.$('.swatch-attribute.color .swatch-option');
    if (colorOption) {
      await colorOption.click();
      await page.waitForSelector('.swatch-attribute.color .swatch-option.selected', { timeout: 5000 }); 
    }
  
    await page.click('#product-addtocart-button');
    await page.waitForSelector('.message-success', { timeout: 10000 }); 
  
    await page.goto('https://magento.softwaretestingboard.com/checkout/cart/');
    await page.waitForSelector('.checkout-methods-items button', { timeout: 10000 });
  
    const checkoutBtn = await page.$('.checkout-methods-items button');
    expect(checkoutBtn).not.toBeNull();
  }, 30000); 


  test('Sort Products by Price (Low to High)', async () => {
    await page.goto('https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html');
  
    await page.select('#sorter', 'price');
  
    await page.waitForSelector('.product-item-info', { visible: true });
    await new Promise(resolve => setTimeout(resolve, 3000));
  
    const prices = await page.$$eval('.price-final_price .price', priceEls =>
      priceEls.map(el => {
        const text = el.textContent.trim().replace(/[^0-9.]/g, '');
        return parseFloat(text);
      })
    );
  
    console.log('Extracted prices:', prices);
  
    const isSorted = prices.every((price, index, arr) =>
      index === 0 || arr[index - 1] <= price
    );
  
    expect(isSorted).toBe(true);
  }, 25000);
  
  
  test('Add product to wishlist', async () => {
    await page.goto('https://magento.softwaretestingboard.com/');
  
    await page.waitForSelector('.product-item .product-item-info a', { timeout: 10000 });
    const productLink = await page.$('.product-item .product-item-info a');
    await productLink.click();
  
    await page.waitForSelector('.action.towishlist', { timeout: 10000 });
    await Promise.all([
      page.waitForNavigation(),
      page.click('.action.towishlist')
    ]);
  
    const successMsg = await page.$eval('.message-success div', el => el.textContent);
    expect(successMsg).toMatch(/has been added to your Wish List/i);
  }, 20000)});