/**
 * Created on 6/9/2014.
 *
 * STREAMS
 * Enable data to be processed piece-by-piece, especially for those data that are big.
 * Streams can be readable, writeable or both.
 *
 * Example of streams: Http request & response, File I/O
 *
 * REF:
 *      https://www.youtube.com/watch?v=9Ui3DaNO7lE
 */

var http = require('http');
var fs = require('fs');


/**
 * Example of streaming from Http request to response (Echo server)
 * Also see shortcut below - httpStreamingWithPipe()
 */
function httpStreaming() {
    http.createServer(function(req, res) {
        res.writeHead(200);

        // Handling data streaming event
        req.on('data', function(dataChunk) {
           // Process data chunk as it becomes available
            console.log(dataChunk.toString());
            res.write(dataChunk);
        });

        // Handling end of data streaming event
        req.on('end', function() {
           // close the Http response
            res.end();
        });
    }).listen(9080);    // Listen to Port 9080
}

/**
 * Example of streaming from Http request to response with PIPE
 *
 * PIPE - handles coordination between the read and write stream, properly handling
 * pause if necessary, when the writable needs to catch-up
 */
function httpStreamingWithPipe() {
    http.createServer(function(req, res) {
        res.writeHead(200);
        req.pipe(res);
    }).listen(9080);    // Listen to Port 9080
}

/**
 * Example of streaming input file to output file using PIPE
 */
function fileStreaming() {
    var inputFile = fs.createReadStream('input.txt');
    var outputFile = fs.createWriteStream('output.txt');
    inputFile.pipe(outputFile);
}

/**
 * Example of Http server that handles file upload
 */
function uploadToHttpServer() {
    http.createServer(function(req, res) {
        var uploadFile = fs.createReadStream('upload.txt');
        req.pipe(uploadFile);

        // Handle successful file upload
        req.on('end', function() {
            res.writeHead(200);
            res.end('File uploaded');
        });
    }).listen(9080);    // Listen to Port 9080

}