
const path = require('path');

const { By, promise, until, Key } = require('selenium-webdriver');

const log = require('../../lib/logn');

describe('ng-calc', async () => {

    let driver;

    beforeAll(async () => {

        driver = await require(path.resolve(__dirname, '..', '..', 'driver.js'));
    });

    test('wait-for-js', async () => {

        await driver.getTestServer('/004-wait-for-js2/index.html');

        var json = await driver.executeAsyncScript(
            function (json) {

                logInBrowser('executed');

                var cb = arguments[arguments.length - 1];

                var handler, tmp;

                function test() {

                    tmp = window.getComputedStyle(document.querySelector('.test3'), null).getPropertyValue("color");

                    logInBrowser('color: ' + tmp);

                    if (tmp === "rgba(83, 86, 240, 0.93)") {

                        logInBrowser('match');

                        clearInterval(handler);

                        json.isblue = tmp;

                        cb(json);
                    }
                };

                handler = setInterval(test, 300);

                test();
            },
            {
                test: 'data passed from test'
            }
        );

        await promise.delayed(1000);

        expect(json.isblue).toBe("rgba(83, 86, 240, 0.93)");
        expect(json.test).toBe("data passed from test");

        // expect(JSON.stringify(json)).toBe('{"realdata":"rgb(0, 0, 255)","test":"data passed from test","added":"in browser"}');

    }, 30000);

    afterAll(async () => {
        await driver.quit();
    });
});