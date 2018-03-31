
const path = require('path');

const { By, promise, until, Key } = require('selenium-webdriver');

const log = require('../../lib/logn');

const fs = require('fs');

describe('wait-custom-event', async () => {

    let driver;

    beforeAll(async () => {

        driver = await require(path.resolve(__dirname, '..', '..', 'driver.js'));
    });

    test('inline', async () => {

        await driver.getTestServer('/web/005-wait-custom-event/inline.html');

        let button = await driver.findElement(By.css('button'));

        await button.click();

        // await promise.delayed(1000);

        /**
         * debug version
         */
            // var json = await driver.executeAsyncScript(
            //     function (json) {
            //
            //         logInBrowser('evaluation (seleniumplugin length: ' + json.seleniumplugin.length + ')');
            //
            //         eval(json.seleniumplugin);
            //
            //         delete json.seleniumplugin;
            //
            //         logInBrowser('evaluation success...');
            //
            //         var cb = arguments[arguments.length - 1];
            //
            //         logInBrowser('data passed from test: ' + JSON.stringify(json));
            //
            //         selenium.subscribe('internal', data => {
            //
            //             logInBrowser('internal subscribe: ' + data);
            //
            //             json.internal = 'test ' + data;
            //         });
            //
            //         selenium.dispatch('internal', 'passed');
            //
            //         selenium.subscribe(json.name, data => {
            //
            //             logInBrowser('subscribe triggered...');
            //
            //             json.finalevent = data;
            //
            //             cb(json);
            //         });
            //     },
            //     {
            //         name: 'test_event',
            //         seleniumplugin
            //     }
            // );

        const json = await driver.waitForCustomEvent('test_event');

        // log.dump(json);

        expect(json.value).toBe("data passed from js");

    }, 6000);

    test('import', async () => {

        await driver.getTestServer('/web/005-wait-custom-event/import.html');

        let button = await driver.findElement(By.css('button'));

        await button.click();

        const json = await driver.waitForCustomEvent('test_event');

        expect(json.value).toBe("data passed from js");

    }, 6000);

    afterAll(async () => {
        await driver.quit();
    });
});