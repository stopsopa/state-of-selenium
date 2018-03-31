
const path = require('path');

const { By, promise } = require('selenium-webdriver');

describe('js-click', async () => {

    let driver;

    beforeAll(async () => {

        driver = await require(path.resolve(__dirname, '..', '..', 'driver.js'));
    });

    it('nong', async () => {

         // https://stopsopa.github.io/research-protractor/e2e/angular-calc/calc.html
        await driver.getTestServer('/web/001-js-click/index.html');

        await promise.delayed(1000);

        let button = await driver.findElement(By.id('go'));

        let div = await driver.findElement(By.css('div'));

        await button.click();

        await promise.delayed(1000);

        expect(await div.getText()).toBe('clicked');
    });

    afterAll(async () => {

        await driver.quit();
    });
});