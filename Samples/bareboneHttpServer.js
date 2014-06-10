/**
 * Created on 6/9/2014.
 */
var http = require('http');

http.createServer(function(req, res) {
    // Status code in header
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=UTF-8'
    });
    // Response body
    res.write('Hello from NodeHelloWorld.\n');
    // Close connection
    res.end();

}).listen(9080, "");    // Listen to Port 9080
console.log('Listening to port 9080...');
