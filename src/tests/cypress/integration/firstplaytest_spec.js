/* const { webkit, chromium, firefox } = require('playwright');

(async () => {
  for (const browserType of [webkit, chromium, firefox]) {
    const browser = await browserType.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('http://192.168.99.102:8080/');
    await page.screenshot({ path: `screen-${browserType.name()}.png` });
    await browser.close();
  }
})(); */
describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.visit('http://192.168.99.102:8080/')
  })
})
