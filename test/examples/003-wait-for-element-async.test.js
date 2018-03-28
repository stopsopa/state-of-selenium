
const path = require('path');

const { By, promise, until, Key } = require('selenium-webdriver');

const log = require('../../lib/logn');

describe('ng-calc', async () => {

    let driver;

    beforeAll(async () => {

        driver = await require(path.resolve(__dirname, '..', '..', 'driver.js'));
    });

    test('find by js async', async () => {

        await driver.getTestServer('/003-wait-for-element-async/index.html');

        // await promise.delayed(4000);

        /**
         * This will immediately check if element exist on the page, and throw error if not:
         *      TypeError: Custom locator did not return a WebElement
         */
            // let li = await driver.findElement(By.js(() => {
            //     return document.querySelector('.dynamic');
            // }));

        /**
         * This will wait for element to appear on the page (in this case for 5 sec, interval 1 sec)
         */
            let li = await driver.waitInterval(until.elementLocated(By.js(() => {
                return document.querySelector('.dynamic');
            })), 5000, 1000, 'message....');

        expect(await li.getText()).toBe('test 3 text modified');
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    });
});