/**
 * Created on 6/13/2014.
 *
 * Basic how-to use the Express module
 *
 * URL : http://expressjs.com/
 *
 */

// Make sure "express" is installed; "npm install express"
var express = require('express');
// https://github.com/mikeal/request - Simplified Http client
// Need to npm install request
var request = require('request');
var url = require('url');

var app = express();

// ROUTE: root
app.get('/', function(req, res) {
   // __dirname is the current directory
   res.sendfile(__dirname + '/index.html');
});

// ROUTE: openLibrary Search API
app.get('/searchBook/:title', function(req, res) {

    // extract title
    var bookTitle = req.params.title;
    console.log('Book title: ' + bookTitle);

    /**
    var options = {
        protocol: 'http',
        host: 'www.openlibrary.org',
        pathname: '/search.json',
        query: {'title': bookTitle},
        proxy: 'http://proxy.oak.sap.corp:8080'
    };
     */
    var options = {
        protocol: 'http',
        host: 'cricscore-api.appspot.com',
        pathname: '/csa',
        proxy: 'proxy.oak.sap.corp:8080'
    };

    var openLibraryUrl = url.format(options);

    // pipe request to response
    // Can be done with a more complicate http.request() method; require('http') module
    request(openLibraryUrl).pipe(res);
    /**
    request('http://www.google.com', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body) // Print the google web page.
        } else {
            console.log(error);
        }
        res.end();
    });
     */
});

var server = app.listen(8888, function() {
    console.log('Server listening to port 8888...');
});

