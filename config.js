
const path              = require('path');

// const host              = require('../react/hosts');

// const yaml              = require('./lib/yaml');

// const log               = require('./lib/logn');

// const sf_parameters_yml = path.resolve(__dirname, '../php/app/config/parameters.yml');
//
// const sf_parameters     = yaml(sf_parameters_yml).parameters;
//
// const docker_local_yml  = path.resolve(__dirname, '../docker/docker-compose.local.yml');
//
// const docker_local      = yaml(docker_local_yml);

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


    // projectServer: host.server,

    projectServer: { // yarn server
        host: 'localhost',
        port: 93
    },

    testServer: { // yarn server
        host: 'localhost',
        port: 4447
    },

    // mysql: { // https://github.com/mysqljs/mysql#connection-options
    //     connectionLimit : 3,
    //     host     : '0.0.0.0',
    //     port     : docker_local.services.mysql.ports[0].split(':')[0],
    //     user     : sf_parameters.database_user,
    //     password : sf_parameters.database_password,
    //     database : sf_parameters.database_name,
    //     connectTimeout: 3000,
    //     table           : 'spark_cache'
    // }
};
