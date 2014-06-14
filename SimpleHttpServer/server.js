/**
 * Created on 5/27/2014.
 */
var http = require("http");
var url = require("url");

function start (route, routes) {
    function onRequest (request, response) {

        var pathname = url.parse(request.url).pathname;
        console.log("Request for '" + pathname + "' received.");

        // Blocking server
            //blockingServer(pathname, route, routes, response);
        // ReFactor - Non-Blocking; Temp solution until know how to code callback
        var postData = "";
        // Received data needs to be UTF8 encoded
        request.setEncoding("utf8");
        request.addListener("data", function(postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '" + postDataChunk + "'.");
        });
        request.addListener("end", function() {
            console.log("Received complete POST data: " + postData);
            route(pathname, routes, response, postData);
        });
    }

    http.createServer(onRequest).listen(8888);
    console.log('Server listening to port 8888....');
}

function blockingServer(pathname, route, routes, response) {
    // Route function returns the Content
    var content = block_route(pathname, routes);

    // NOTE: This is a BLOCKING implementation.
    // A slow route will block the response of the server below

    // Response
    //response.writeHead(200, {"Content-Type": "text/plain"});
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(content);
    response.end();
}

exports.start = start;
