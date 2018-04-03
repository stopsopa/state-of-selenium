// https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
// caps = {};
// caps['browserName'] = 'chrome';
// caps['platform'] = 'Windows 10';
// caps['version'] = '65.0';

// from : http://seleniumhq.github.io/selenium/docs/api/javascript/
// and above is from: https://github.com/SeleniumHQ/selenium

// explore code :
// https://github.com/SeleniumHQ/selenium/tree/master/javascript/node/selenium-webdriver
// auto generated doc:
// http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index.html

const path = require('path');

const fs = require('fs');

const stringify = require('json-stable-stringify');

const log = require(path.resolve(__dirname, '.', 'lib', 'logn'));


// console.log(typeof require('selenium-webdriver'));
// process.exit(0);

// require(path.resolve(__dirname, '..', 'lib', 'rootrequire'))(__dirname, '..');

const {Builder, By, Key, until, promise, Browser, Platform } = require('selenium-webdriver');
const chrome    = require('selenium-webdriver/chrome');
const Options   = chrome.Options;
// const edge      = require('selenium-webdriver/edge');
// const firefox   = require('selenium-webdriver/firefox');

// const wait = (sec = 1) => new Promise(r => {const ms = parseInt(sec * 1000); setTimeout(r, ms, 'resolved: wait ' + sec + ' sec')});

const config = require(path.resolve('.', 'config'));

let endpoint;

if (process.env.TRAVIS) {

    /**
     * https://docs.travis-ci.com/user/sauce-connect/#Setting-up-Sauce-Connect
     * https://github.com/samccone/travis-sauce-connect/blob/master/test/basic.js
     */
    endpoint = 'http://'+ process.env.SAUCE_USERNAME+':'+process.env.SAUCE_ACCESS_KEY+'@ondemand.saucelabs.com:80/wd/hub';
}
else {

    endpoint = `http://${config.node.host}:${config.node.port}/wd/hub`;
}

module.exports = (async function () {

    let driver;

    try {

        /**
         * https://saucelabs.com/platforms
         * https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/ g(Platform Configurator)
         * caps = {};
         caps['browserName'] = 'chrome';
         caps['platform'] = 'Windows 10';
         caps['version'] = '65.0';
         */
        driver = await new Builder()
            .usingServer(endpoint) //  to check go to : http://localhost:4444/grid/console?config=true&configDebug=true&refresh=10
            .forBrowser(Browser.CHROME, 'Windows 10', '65.0') // local instance of node don't care about platfor & version, but saucelabs do
            // .forBrowser(Browser.CHROME)
            .setChromeOptions(
                new chrome
                    .Options()
                // .headless()
                    .windowSize({
                        width: config.width,
                        height: config.height
                    })

                // available devices, source code of chromium project
                // current version: https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/Source/devtools/front_end/emulated_devices/module.json
                // older version: https://chromium.googlesource.com/chromium/src/+/ba858f4acbb01a224f03c5c19b392b94aae0ef91/third_party/WebKit/Source/devtools/front_end/toolbox/OverridesUI.js
                // new Options().setMobileEmulation({deviceName: "iPhone 6"}) // from 4 up to 6
            )
            // .setFirefoxOptions(
            //     new firefox
            //         .Options()
            //     //.headless()
            //         .windowSize({config.width, config.height})
            // )
            .setChromeService(
                new chrome.ServiceBuilder()
                    .enableVerboseLogging()
                    .setStdio('inherit'))
            // .setEdgeService(
            //     process.platform === 'win32'
            //         ? new edge.ServiceBuilder()
            //             .enableVerboseLogging()
            //             .setStdio('inherit')
            //         : null)
            // .setFirefoxService(
            //     new firefox.ServiceBuilder()
            //         .enableVerboseLogging()
            //         .setStdio('inherit'))
            .build()
        ;

        // // await driver.get('http://www.google.com/ncr');
        // //
        // // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        // //
        // // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
        // //
        // // await promise.delayed(2000);
        // // const sec = await wait(10).catch(e => log('err', e));
        //
        // await driver.get('https://stopsopa.github.io/research-protractor/e2e/ng.html');
        //
        //
        // let button = await driver.findElement(By.id('go'));
        //
        // let div = await driver.findElement(By.css('div'));
        //
        // // await driver.actions({bridge: true}).click(button).perform(); // more complicated way
        //
        // await button.click();
        //
        // const html = await div.getText();
        //
        // await promise.delayed(2000);
        //
        // console.log('test 1', html === 'clicked' ? 'true' : 'false')


    } catch (e) {
        log.dump('e', e, e.message)
    }
    finally {

        // if (driver) {
        //
        //     await driver.quit();
        // }
    }

    if ( ! driver ) {

        throw "driver.js: driver object was not created ...";
    }

    driver.config = config;

    /**
     * This method seems to provide page after DOMContentLoaded was triggered.
     *
     * documentation of driver.get says:
     *
     *      "A promise that will be resolved when the document has finished loading"
     *
     *      from :
     *          http://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/index_exports_WebDriver.html#get
     *          https://imgur.com/ANmE9wb
     *
     *      to test run:
     *
     *          await driver.getTestServer('/003-own-js-check-async/index.html');
     *
     *          let div = await driver.findElement(By.js(() => {
     *              return document.querySelector('#DOMContentLoaded');
     *          }));
     *
     expect(await div.getText()).toBe('test dom');
     * @param path
     * @param rest
     * @returns {*}
     */
    driver.getTestServer = (path, ...rest) => {

        if (/^https?:\/\//.test(path)) {

            return old(path, ...rest);
        }

        let url = `${config.testServer.schema}://${config.testServer.host}`;

        if (config.testServer.port != 80) {

            url += ':' + config.testServer.port;
        }

        if (process.env.TRAVIS) {

            url += '/state-of-selenium';
        }

        url += path;

        process.stdout.write('getTestServer: ' + url + "\n");

        return driver.get(url, ...rest);
    }
    driver.getProjectServer = (path, ...rest) => {

        if (/^https?:\/\//.test(path)) {

            return old(path, ...rest);
        }

        let url = `${config.projectServer.schema}://${config.projectServer.host}`;

        if (config.projectServer.port != 80) {

            url += ':' + config.projectServer.port;
        }

        url += path;

        process.stdout.write('getTestServer: ' + url + "\n");

        return driver.get(url, ...rest);
    }

    driver.waitInterval = (condition, timeout, interval = 300, message = undefined) => new Promise((resolve, reject) => {

        if (typeof timeout === 'undefined') {

            timeout = 5000;
        }

        timeout = parseInt(timeout, 10);

        if (timeout < 1) {

            throw "waitInterval: timeout should be bigger then 1"
        }

        let
            inthan,
            resolved = false,
            timeoutHandler = (e, name) => {

                resolved = true;

                clearInterval(inthan);

                reject(e || {
                    name: name || "TimeoutError",
                    remoteStacktrace: "",
                    origin: 'driver.waitInterval'
                });

            }
        ;

        inthan = setTimeout(timeoutHandler, timeout);

        (function again() {

            if ( ! resolved ) {

                driver.wait(condition, 1, message)
                    .then(
                        resolve,
                        e => {

                            if (e.name === 'TimeoutError') {

                                return setTimeout(again, interval);
                            }

                            timeoutHandler(e, 'Other error, NOT TimeoutError')
                        }
                    )
                ;
            }

        }());
    });

    driver.getPathname = () => driver.executeScript(function () {
        return location.pathname + location.search;
    });

    driver.getStatus = () => driver.executeScript(function () {
        return window.responsestatuscode;
    });

    driver.testStatus = async (status = 200) => {

        expect(await driver.getStatus()).toBe(status);

        return driver;
    }

    driver.waitForElement = (fn, interval, timeout, message) => {

        if (typeof fn === 'string') {

            let b = '"'

            if (fn.indexOf('"') > -1) {

                b = "'";
            }

            fn = Function(`return document.querySelector(${b}${fn}${b})`);

        }

        var promise = driver.waitInterval(until.elementLocated(By.js(fn)), timeout, interval, message)

        promise.catch(reason => {
            process.stdout.write('waitForElement catch: ' + "\n");
            log.dump(reason)
        })

        return promise;
    };

    driver.waitForCustomEvent = (function () {

        let cache;

        const getSeleniumLib = () => {

            if ( ! cache ) {

                cache = fs.readFileSync(path.resolve(__dirname, 'lib/selenium.min.js')).toString();
            }

            return cache;
        }

        /**
         * requirement - function || bool[works like multiple flag] (def, undefined)
         * await driver.waitForCustomEvent('mainRequest:material-list', (data, curlang) => {
                return data && data.supportSelectedLanguage == curlang
           }, curlang)
         */
        return (name, requirement, dataForRequirement) => {

            if ( ! name || typeof name !== 'string') {

                throw `waitForCustomEvent: name should be non empty string`;
            }

            if (typeof requirement === 'undefined') {

                requirement = false;
            }

            const promise = driver.executeAsyncScript(
                function(json){
                    logInBrowser && logInBrowser('XX: before json eval')
                    logInBrowser && logInBrowser('XX: ' + JSON.stringify(json))
                    eval(json.seleniumplugin);
                    logInBrowser && logInBrowser('XX: before eval requirement')
                    eval('var requirement=' + json.requirement);
                    logInBrowser && logInBrowser('XX: before delete')
                    delete json.seleniumplugin;
                    var cb=arguments[arguments.length-1];
                    logInBrowser && logInBrowser('XX: req is fn: ' + (typeof requirement==='function'))
                    selenium.subscribe(
                        json.name,
                        (typeof requirement==='function') ?
                            function(data){
                                logInBrowser && logInBrowser('XX: inside fn, data: ', JSON.stringify(data))
                                logInBrowser && logInBrowser('XX: json: ' + JSON.stringify(json))
                                if(requirement(data,json.dataForRequirement)){
                                    logInBrowser && logInBrowser('XX: req() return true')
                                    cb(data)
                                }

                                setTimeout(cb, 5000, 'executeAsyncScript failed' + "\n" + document.querySelector('pre').innerText);
                            }:cb,
                        // data => cb({
                        //     data:data,
                        //     json: json
                        // }),
                        !!requirement
                    )
                },
                {
                    name,
                    seleniumplugin: getSeleniumLib(),
                    requirement: requirement.toString(),
                    dataForRequirement,
                }
            );

            promise.catch(e => {
                process.stdout.write('waitForCustomEvent: ' + "\n");
                log.dump(e)
            })

            return promise;
        };
    }());

    driver.waitForJs = (fn, data, interval = 300) => {

        if (interval < 3) {

            throw `waitForJs: 'interval' should be bigger then 3 ms`
        }

        if (['function', 'string'].indexOf(typeof fn) === -1) {

            throw `waitForJs: 'fn' should be bigger function or strings`;
        }

        if (typeof fn === 'string') {

            try {
                eval('const tmp = ' + fn);

                if (typeof tmp !== 'function') {

                    throw `waitForJs: 'fn' after evaluation is not function`;
                }
            }
            catch (e) {

                throw `waitForJs: evaluation 'fn' parameter from string to function failed`;
            }
        }

        const promise = driver.executeAsyncScript(
            function(json){eval('var fn='+json.fn);var cb = arguments[arguments.length - 1];var handler;function test(){let result;try{result = fn(json.data)}catch(e){clearInterval(handler);return cb({__origin__:'waitForJs',string:e.toString(),fileName:e.fileName, stack:e.stack,columnNumber:e.columnNumber})}if(result){clearInterval(handler);cb(result)}};handler=setInterval(test,json.interval);test()},

            // implementation for testing
            // function (json) {
            //
            //     logInBrowser('executed');
            //
            //     eval('var fn = ' + json.fn);
            //
            //     var cb = arguments[arguments.length - 1];
            //
            //     var handler, tmp;
            //
            //     function test() {
            //
            //         logInBrowser(JSON.stringify(json.data))
            //
            //         let result
            //
            //         try {
            //
            //             result = fn(json.data);
            //         }
            //         catch (e) {
            //
            //             clearInterval(handler);
            //
            //             return cb({
            //                 __origin__      : 'waitForJs',
            //                 string          : e.toString(),
            //                 fileName        : e.fileName,
            //                 stack           : e.stack,
            //                 columnNumber    : e.columnNumber
            //             })
            //         }
            //
            //         if (result) {
            //
            //             clearInterval(handler);
            //
            //             cb(result);
            //         }
            //     };
            //
            //     handler = setInterval(test, json.interval);
            //
            //     test();
            // },
            {
                fn: fn.toString(),
                interval,
                data
            }
            )
                .then(result => {

                    if (result && result.__origin__ === 'waitForJs') {

                        return Promise.reject(result);
                    }

                    return result;
                })
        ;

        promise.catch(e => {
            process.stdout.write('waitForCustomEvent: ' + "\n");
            log.dump(e)
        })

        return promise;
    }

    driver.json = data => stringify(data)

    driver.sleep = ms => promise.delayed(ms)

    driver.sleepSec = sec => promise.delayed(Math.ceil(sec * 1000));

    return driver;
})();

