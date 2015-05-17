'use strict';
/**
 * Created on 6/13/2014.
 *
 * Basic how-to use the Express module
 * URL : http://expressjs.com/
 *
 * Need to 'npm install': request, ejs
 *
 * Setup proxy when needed using the 'Application Parameter'
 *  http://proxy.oak.sap.corp
 *
 * Also see the following for EJS template info
 *      http://robdodson.me/blog/2012/05/31/how-to-use-ejs-in-express/
 */

// Make sure "express" is installed; "npm install express"
var express = require('express')
        // https://github.com/mikeal/request - Simplified Http client
        // Need to npm install request
    , request = require('request')
    , http = require('http')
    , url = require('url')
        // socket.io example
    , socket = require('socket.io')
    ;

var app = express();


var proxy = process.argv[2];
if (proxy) {
    console.log('argv[2] = ' + proxy);
}

function urlParseAddProxy(urlStr) {
    var parsedURLObj = url.parse(urlStr);
    var options = {
        url: parsedURLObj
    };
    // Following alternative will also work
    /**
    var options = {
        url: urlStr
    };
     */
    if (proxy) {
        options.proxy = proxy.toLowerCase();
    }
    return options;
}

// ROUTE: root
app.get('/', function(req, res) {
   // __dirname is the current directory
   res.sendfile(__dirname + '/index.html');
});

// ROUTE: openLibrary Search API
//      curl http://localhost:8888/searchBook/remote
//      or use browser
app.get('/searchBook/:title', function(req, res) {

    // extract title
    var bookTitle = req.params.title;
    console.log('Book title: ' + bookTitle);

    var svcURL = 'http://www.openlibrary.org/search.json?title='+bookTitle;
    var options = urlParseAddProxy(svcURL);
    request(options).pipe(res);
});

// ROUTE: Country list
//      use browser -  http://localhost:8888/countries
app.get('/countries', function(req, res) {

     var options = {
        protocol: 'http',
        host: 'restcountries.eu',
        pathname: '/rest/v1'
    };

    var svcUrl = 'http://www.restcountries.eu/rest/v1';
    var options = urlParseAddProxy(svcUrl);
    //request(svcUrl).pipe(res);
    request(options, function (error, response, body) {
        var countries = JSON.parse(body);
        console.log('Countries: ' + JSON.stringify(countries));
        res.render('countries.ejs', {'countries': countries});
    });
});

// ROUTE: chat
app.get('/chat', function(req, res) {
    // __dirname is the current directory
    console.log('route to chat...');
    res.sendfile(__dirname + '/chat.html');
});

var server = app.listen(8888, function() {
    console.log('Server listening to port 8888...');
});
// The following also works but require('http') module
/**
var server = http.createServer(app).listen(8888,function() {
    console.log('Server listening to port 8888...');
});
 */

var io = socket.listen(server);
io.sockets.on('connection', function(socket) {
    console.log('Client connected...');

    // emit the message event on client connect
    socket.emit('messages', {hello: 'world'});

    // onReceive client 'send message' event
    socket.on('send message', function(data){
        // send to everyone including me
        io.sockets.emit('new message', data);
        // alternatively, can send to everyone except me
        // clientSocket.broadcast('new message', data);
    });
});