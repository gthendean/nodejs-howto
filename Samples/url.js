'use strict';
/**
 * Created on 6/16/2014.
 *
 * Example and experiement with Node.js URL
 *
 * TODO need to cleanup
 */
var url = require('url');

var proxy = 'http://proxy.oak.sap.corp:8080/';
//var proxy = {host: 'proxy.oak.sap.com'};

if (typeof proxy == 'string') {
    var parsedProxy = url.parse(proxy);
    console.log('Parsed URL = ' + JSON.stringify(parsedProxy));
} else {
    console.log('Not a string - ' + proxy);
}

var options = {
    protocol: 'http',
    host: 'www.openlibrary.org',
    pathname: '/search.json',
    query: {'title': 'remote'},
    proxy: 'http://proxy.oak.sap.corp:8080/'
};

var svcUrl = url.format(options);
console.log('url.format = ' + svcUrl);