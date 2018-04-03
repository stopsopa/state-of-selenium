
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
        // await driver.get('https://stopsopa.github.io/state-of-selenium/web/008-custom-event-filtered/index.html?wrong');

        // await driver.sleepSec(1)

        // expect(true).toBe(false);

        const data = await driver.waitForCustomEvent('test');

        expect(data.value_to_test).toBe('fake previous remaining event')
        // expect(data.value_to_test).toBe('the event that we waiting for')

    }, 4000);

    test('subscribed and filter event - button', async () => {

        await driver.getTestServer('/web/008-custom-event-filtered/button.html?filtered_and_sequence');
        // await driver.get('https://stopsopa.github.io/state-of-selenium/web/008-custom-event-filtered/index.html?filtered_and_sequence');

        const button = await driver.waitForElement('button');

        await button.click();

        const data = await driver.waitForCustomEvent('test', (data, filter) => {
            return data.value_to_test === filter.value
        }, {
            value: "the event that we waiting for: go"
        });

        expect(data.value_to_test).toBe("the event that we waiting for: go")

    }, 7000);

    test('subscribed and filter event', async () => {

        await driver.getTestServer('/web/008-custom-event-filtered/index.html?filtered_and_sequence');
        // await driver.get('https://stopsopa.github.io/state-of-selenium/web/008-custom-event-filtered/index.html?filtered_and_sequence');

        const option = await driver.waitForElement(() => {
            return document.querySelectorAll('select option')[1]
        });

        await option.click();

        const data = await driver.waitForCustomEvent('test', (data, filter) => {
            return data.value_to_test === filter.value
        }, {
            value: "the event that we waiting for: two"
        });

        expect(data.value_to_test).toBe("the event that we waiting for: two")

    }, 7000);

    test('test selenium.js itself', async () => {

        const pre = await driver.waitForElement(() => document.querySelector('pre'));

        let text = await pre.getText();

        text = text.split("\n").map(e => e.substring(19)).join("\n");

        // log.dump(text)
        // 2018-03-30 23:39:31 test/examples/008-custom-event-filtered.test.js:64
        // [String]: >: ... but action was done now
        // : {"subscribe_triggered":{"value_to_test":"the event that we waiting for: two"}}
        // : {"subscribe_triggered_permanent":{"value_to_test":"the event that we waiting for: two"}}
        // : {"subscribe_triggered_permanent":{"value_to_test":"the event that we waiting for: two"}}
        // : {"subscribe_triggered_permanent":{"value_to_test":"fake previous remaining event"}}
        // : change triggered, but wait...two
        // : {"subscribe_triggered_permanent":{"value_to_test":"fake previous remaining event"}}
        // : {"subscribe_triggered":{"value_to_test":"fake previous remaining event"}}< len: 575

        expect(text).toMatchSnapshot()

    }, 7000);

    afterAll(async () => {
        await driver.quit();
    });
});