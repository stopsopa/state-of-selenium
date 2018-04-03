
const path = require('path');

const { By, promise, until, Key } = require('selenium-webdriver');

const log = require('../../lib/logn');

describe('008-custom-event-filtered', async () => {

    let driver;

    beforeAll(async () => {

        driver = await require(path.resolve(__dirname, '..', '..', 'driver.js'));
    });

    test('subscribed to wrong event', async () => {

        await driver.getTestServer('/web/008-custom-event-filtered/index.html?wrong');

        // await driver.sleepSec(1)

        // expect(true).toBe(false);
        await driver.sleepSec(2)

        const go = await new Promise(res => {

            res('go');
            driver.executeAsyncScript((...args) => {

                logInBrowser && logInBrowser('XX: triggered...')

                var cb = args[args.length - 1];

                setTimeout(() => {

                    logInBrowser && logInBrowser('XX: triggered... set timeout')

                    cb(document.querySelector('pre').innerText);

                }, 8000);

            }).then(data => {

                log("\n\n\n");
                log('pre');
                log.dump(data);
                log("\n\n\n\n\n\n\n");

            });
        });

        log('continue', go);

        const data = await driver.waitForCustomEvent('test');

        expect(data.value_to_test).toBe('fake previous remaining event')
        // expect(data.value_to_test).toBe('the event that we waiting for')

        await driver.sleepSec(10);

    }, 17000);

    // test('subscribed and filter event', async () => {
    //
    //     await driver.getTestServer('/web/008-custom-event-filtered/index.html?filtered_and_sequence');
    //
    //     const option = await driver.waitForElement(() => {
    //         return document.querySelectorAll('select option')[1]
    //     });
    //
    //     option.click();
    //
    //     const data = await driver.waitForCustomEvent('test', (data, filter) => {
    //         return data.value_to_test === filter.value
    //     }, {
    //         value: "the event that we waiting for: two"
    //     });
    //
    //     await driver.sleepSec(10);
    //
    //     expect(data.value_to_test).toBe("the event that we waiting for: two")
    //
    // }, 7000);
    //
    // test('test selenium.js itself', async () => {
    //
    //     const pre = await driver.waitForElement(() => document.querySelector('pre'));
    //
    //     let text = await pre.getText();
    //
    //     text = text.split("\n").map(e => e.substring(19)).join("\n");
    //
    //     // log.dump(text)
    //     // 2018-03-30 23:39:31 test/examples/008-custom-event-filtered.test.js:64
    //     // [String]: >: ... but action was done now
    //     // : {"subscribe_triggered":{"value_to_test":"the event that we waiting for: two"}}
    //     // : {"subscribe_triggered_permanent":{"value_to_test":"the event that we waiting for: two"}}
    //     // : {"subscribe_triggered_permanent":{"value_to_test":"the event that we waiting for: two"}}
    //     // : {"subscribe_triggered_permanent":{"value_to_test":"fake previous remaining event"}}
    //     // : change triggered, but wait...two
    //     // : {"subscribe_triggered_permanent":{"value_to_test":"fake previous remaining event"}}
    //     // : {"subscribe_triggered":{"value_to_test":"fake previous remaining event"}}< len: 575
    //
    //     expect(text).toMatchSnapshot()
    //
    // }, 7000);

    afterAll(async () => {
        await driver.quit();
    });
});