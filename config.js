
module.exports = {
    width: 1024,
    height: 768,
    hub: {
        host: "localhost", // http://localhost:4445/grid/console?config=true&configDebug=true&refresh=10
        port: 4445 // def 4444
    },
    node: {
        host: "127.0.0.1",
        port: 4446 // def 5555
    },
    waitToRunSeleniumCluster: 8, // sec
    curlTestMaxTime: 1, // sec

    projectServer: { // yarn server
        host: 'localhost',
        port: 93
    },

    testServer: { // yarn server
        host: 'localhost',
        port: 4447
    }
};