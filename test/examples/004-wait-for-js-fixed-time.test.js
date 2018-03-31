
const path = require('path');

const { By, promise, until, Key } = require('selenium-webdriver');

const log = require('../../lib/logn');

describe('wait-for-js-fixed-time', async () => {

    let driver;

    beforeAll(async () => {

        driver = await require(path.resolve(__dirname, '..', '..', 'driver.js'));
    });

    test('wait-for-js-fixed', async () => {

        await driver.getTestServer('/web/004-wait-for-js-fixed-time/index.html');

        var json = await driver.executeAsyncScript(
            function (json) {

                var cb = arguments[arguments.length - 1];

                logInBrowser('executed')

                window.setTimeout(() => {

                    json.added = 'in browser';

                    json.realdata = window.getComputedStyle(document.querySelector('.test3'), null).getPropertyValue("color");

                    cb(json);
                }, 4000);
            },
            {
                test: 'data passed from test'
            }
        );

        expect(json.added).toBe("in browser");
        expect(json.realdata).toBe("rgb(0, 0, 255)");
        expect(json.test).toBe("data passed from test");

        expect(JSON.stringify(json)).toBe('{"realdata":"rgb(0, 0, 255)","test":"data passed from test","added":"in browser"}');

    }, 30000);

    afterAll(async () => {
        await driver.quit();
    });
});