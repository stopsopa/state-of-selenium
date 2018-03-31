
const path = require('path');

const { By, promise, until, Key } = require('selenium-webdriver');

const log = require('../../lib/logn');

describe('ng-calc', async () => {

    let driver;

    beforeAll(async () => {

        driver = await require(path.resolve(__dirname, '..', '..', 'driver.js'));
    });

    test('wait-for-js', async () => {

        await driver.getTestServer('/web/007-wait-for-truthy-fn/index.html');

        const interval = 300;

        const data = 'data passed';

        // try {

            var json = await driver.waitForJs(data => {

                const test = document.querySelectorAll('li').length > 3;

                if (test) {

                    data.result = test ? 'true' : 'false';

                    return data
                }

            }, {}, 300);
        // }
        // catch (e) {
        //
        //     log('catch:::');
        //     log.dump(e)
        //
        //     throw e;
        // }


        /**
         * test version
         */
        // var json = await driver.executeAsyncScript(
        //     function (json) {
        //
        //         eval('var fn = ' + json.fn);
        //
        //         logInBrowser('executed');
        //
        //         var cb = arguments[arguments.length - 1];
        //
        //         var handler, tmp;
        //
        //         function test() {
        //
        //             let result = fn(json.data);
        //
        //             logInBrowser('attempt: ' + (result ? 'true' : 'false'));
        //
        //             if (result) {
        //
        //                 logInBrowser('match');
        //
        //                 clearInterval(handler);
        //
        //                 cb(result);
        //             }
        //         };
        //
        //         handler = setInterval(test, json.interval);
        //
        //         test();
        //     },
        //     {
        //         fn,
        //         interval,
        //         data
        //     }
        // );

        // log('resutl')
        // log.dump(json)

        expect(json.result).toBe('true');

    }, 4000);

    afterAll(async () => {
        await driver.quit();
    });
});