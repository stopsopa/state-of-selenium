
const path = require('path');

const { By, promise } = require('selenium-webdriver');

describe('js-click', async () => {

    let driver;

    beforeAll(async () => {

        driver = await require(path.resolve(__dirname, '..', 'driver.js'));
    });

    it('warmingup', async () => {

        await driver.getTestServer('/web/warmingup.html');

        const data = await driver.waitForCustomEvent('warmingup');

        expect(data).toBe('Warming up...');
    });

    afterAll(async () => {

        await driver.quit();
    });
});