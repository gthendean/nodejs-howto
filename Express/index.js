/**
 * Created on 6/13/2014.
 *
 * Basic how-to use the Express module
 * URL : http://expressjs.com/
 *
 * Need to 'npm install': request, ejs
 *
 * Also see the following for EJS template info
 *      http://robdodson.me/blog/2012/05/31/how-to-use-ejs-in-express/
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
//      curl http://localhost:8888/searchBook/remote
app.get('/searchBook/:title', function(req, res) {

    // extract title
    var bookTitle = req.params.title;
    console.log('Book title: ' + bookTitle);

    //    'proxy': 'http://proxy.oak.sap.corp:8080'
    var options = {
        protocol: 'http',
        host: 'www.openlibrary.org',
        pathname: '/search.json',
        query: {'title': bookTitle}
    };

    var svcUrl = url.format(options);

    // pipe request to response
    // Can be done with a more complicated http.request() method; require('http') module
    request(svcUrl).pipe(res);
});

// ROUTE: Country list
//      curl http://localhost:8888/countries
app.get('/countries', function(req, res) {

     var options = {
        protocol: 'http',
        host: 'restcountries.eu',
        pathname: '/rest/v1'
    };

    var svcUrl = url.format(options);
    //request(svcUrl).pipe(res);
    request(svcUrl, function (error, response, body) {
        var countries = JSON.parse(body);
        console.log('Countries: ' + JSON.stringify(countries));
        //
        res.render('countries.ejs', {'countries': countries});
    });
});

var server = app.listen(8888, function() {
    console.log('Server listening to port 8888...');
});

