const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: true });
  page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
}, 30000);

afterAll(async () => {
  await browser.close();
});

describe('Magento UI Behavior Tests', () => {
  test('Hover on "Women" menu shows dropdown', async () => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await page.hover('a[href*="women.html"]');
    const dropdownVisible = await page.$eval(
      '.level0.nav-2 .submenu',
      el => el.offsetParent !== null
    );
    expect(dropdownVisible).toBe(true);
  }, 15000);

  test('Search input is visible and focused on click', async () => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await page.click('#search');
    const isFocused = await page.$eval(
      '#search',
      el => document.activeElement === el
    );
    expect(isFocused).toBe(true);
  }, 10000);

  test('Sorting dropdown has expected options', async () => {
    await page.goto('https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html');
    const options = await page.$$eval('#sorter option', opts =>
      opts.map(opt => opt.textContent.trim())
    );
    expect(options).toEqual(expect.arrayContaining([
      'Position',
      'Product Name',
      'Price'
    ]));
  }, 15000);

  test('Clicking filter section expands its options', async () => {
    await page.goto('https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html');
    await page.click('.filter-options-title');
    const isVisible = await page.$eval(
      '.filter-options-content',
      el => el.offsetParent !== null
    );
    expect(isVisible).toBe(true);
  }, 15000);

  test('Mini cart opens on cart icon click', async () => {
    await page.goto('https://magento.softwaretestingboard.com/');
    await page.click('.showcart');
    const minicart = await page.waitForSelector('#minicart-content-wrapper', { visible: true });
    expect(minicart).toBeTruthy();
  }, 15000);
});
