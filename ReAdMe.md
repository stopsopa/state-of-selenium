[![Build Status](https://travis-ci.org/stopsopa/state-of-selenium.svg?branch=master)](https://travis-ci.org/stopsopa/state-of-selenium)
[![Build Status](https://saucelabs.com/buildstatus/stopsopa-test)](https://saucelabs.com/beta/builds/a47e8d511f124186a82f229cee585087)

||||
|--|--|--|
|[macOS High Sierra](https://github.com/stopsopa/state-of-selenium/blob/chrome-machs/.travis.yml#L11)|Chrome|[![Build Status](https://travis-ci.org/stopsopa/state-of-selenium.svg?branch=chrome-machs)](https://travis-ci.org/stopsopa/state-of-selenium)|
|[macOS Sierra](https://github.com/stopsopa/state-of-selenium/blob/chrome-macsi/.travis.yml#L11)|Chrome|[![Build Status](https://travis-ci.org/stopsopa/state-of-selenium.svg?branch=chrome-macsi)](https://travis-ci.org/stopsopa/state-of-selenium)|
|[Windows 10](https://github.com/stopsopa/state-of-selenium/blob/chrome-win10/.travis.yml#L11)|Chrome|[![Build Status](https://travis-ci.org/stopsopa/state-of-selenium.svg?branch=chrome-win10)](https://travis-ci.org/stopsopa/state-of-selenium)|

# DEPRECATED
Created in 2018 - quite old now and not maintained.

Brr, I have goosebumps when I look at this now (Sep 2023)

# how to use

    yarn install
    yarn server
    
    # in another console
    /bin/bash run.sh
    
to stop selenium server

    make sels
    
to run selenium server

    make sel 
    
# setup file:

    config.js           

# api (native WebDriver ):

At the moment of writing this doc 4.0.0-alpha.1

* !!! http://seleniumhq.github.io/selenium/docs/api/javascript/
* https://www.npmjs.com/package/selenium-webdriver
* [very good examples - check dir up too](https://github.com/SeleniumHQ/selenium/tree/master/javascript/node/selenium-webdriver/test)
* https://seleniumhq.github.io/docs/index.html

# more about jest:
    
* https://github.com/stopsopa/roderic/tree/master/test/jest
* https://facebook.github.io/jest/docs/en/setup-teardown.html

# Version of drivers used in this tutorials:

[file](https://github.com/stopsopa/state-of-selenium/blob/master/versions.log)

# It seems like it is better to not use Control Flow

http://www.protractortest.org/#/debugging#disabled-control-flow

.. and in future it will be disabled ... 

http://www.protractortest.org/#/control-flow#disabling-the-control-flow

# check later
 
* [Executing script](https://sqa.stackexchange.com/a/20736)

# more about testing in general:
    
* http://blog.thecodewhisperer.com/permalink/integrated-tests-are-a-scam

# tracking W3C coverage:

- https://developer.mozilla.org/en-US/docs/Mozilla/QA/Marionette/WebDriver/status
