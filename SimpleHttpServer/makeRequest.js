/**
 * Created on 6/12/2014.
 *
 * Make request to the SimpleHttpServer from node.js code.
 * This can also be accomplished with curl
 *      curl --data "enteredText=Test post data" http://localhost:8888/simplePost
 *
 * First, need to run the SimpleHttpServer - index.js
 */

var http = require('http');
var querystring = require('querystring');

var makeRequest = function(message) {
    var options = {
      host: 'localhost',
      port: 8888,
      path: '/simplePost',
      method: 'POST'
    }

    var request = http.request(options, function(response){
     response.on('data', function(data){
         console.log(data.toString());
     });
    });

    var data = querystring.stringify({
        'enteredText': message
    });
    request.write(data);
    request.end();
};

makeRequest('Test post data');