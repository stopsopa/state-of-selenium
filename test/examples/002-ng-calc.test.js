
const path = require('path');

const { By, promise, until, Key } = require('selenium-webdriver');

const log = require('../../lib/logn');

// jest.setTimeout(30000); // this works (1)
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000; // this work's too (2)

describe('ng-calc', async () => {

    // test('test long', done => {
    //     setTimeout(() => {
    //         log('end');
    //         done();
    //     }, 15000);
    // }, 30000); // this work's too (3)

    let driver;

    beforeAll(async () => {

        driver = await require(path.resolve(__dirname, '..', '..', 'driver.js'));
    });

    test('calc', async () => {

        // https://stopsopa.github.io/research-protractor/e2e/angular-calc/calc.html
        // await driver.get('https://stopsopa.github.io/research-protractor/e2e/angular-calc/calc.html');
        await driver.getTestServer('/web/002-ng-calc/calc.html');

        // await promise.delayed(10000);

        // await driver.waitInterval(driver.findElement(By.css('body')), 3000);

        // await promise.delayed(5000);

        // await driver.waitInterval(until.elementLocated(By.css('[ng-model="second"]')), 20000);

        let a = await driver.findElement(By.css('[ng-model="second"]'));
        // await promise.delayed(5000);

        let b = await driver.findElement(By.css('[ng-model="first"]'));
        // await promise.delayed(5000);

        await a.sendKeys("89");
        // await promise.delayed(5000);

        await b.sendKeys("74");

                // let button = await driver.findElement(By.id('gobutton'));
                // //
                // await button.click();

        // instead of above you can press enter
        await b.sendKeys(Key.RETURN);

        // await promise.delayed(5000);

        let timeout = 5000;

        let interval = 300;

        /**
         * use instead driver.waitForElement
         */
        let result = await driver.waitInterval(until.elementLocated(By.css('.table > tbody > tr:nth-child(1) > td:nth-child(3)')), timeout, interval);
        // let result = await driver.wait(until.elementLocated(By.css('.table > tbody > tr:nth-child(1) > td:nth-child(3)')), timeout);

        expect(await result.getText()).toBe('163');
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    });
});