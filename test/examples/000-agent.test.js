
const path = require('path');

const { By, promise } = require('selenium-webdriver');

const log = require('../../lib/logn');

describe('user', async () => {

    let driver;

    beforeAll(async () => {

        driver = await require(path.resolve(__dirname, '..', '..', 'driver.js'));
    });

    it('agent', async () => {

         // https://stopsopa.github.io/research-protractor/e2e/angular-calc/calc.html
        await driver.getTestServer('/web/001-js-click/index.html');

        const agent = await driver.waitForJs(() => {

            try {

                return navigator.userAgent;
            }
            catch (e) {}

            return false;
        }, null, 1000);

        expect(agent.length).toBeGreaterThan(0);

        log('navigator.userAgent');

        log.dump(agent);
    });

    afterAll(async () => {

        await driver.quit();
    });
});