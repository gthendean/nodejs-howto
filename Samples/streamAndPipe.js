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
 *      http://ejohn.org/blog/node-js-stream-playground/
 */

var http = require('http');
var fs = require('fs');

run();

function run() {
    var argv = process.argv[2].toLowerCase();
    console.log('argv[2] = ' + argv);

    switch (argv) {
        case 'file_pipe' :
            fileStreamingWithPipe();
            break;
        case 'http_stream' :
            httpStreaming();
            break;
        case 'http_pipe' :
            httpStreamingWithPipe();
            break;
        case 'http_upload':
            uploadToHttpServer();
            break;
        default:
            console.log('[file_pipe | http_stream | http_pipe | http_upload]');
    }
}

/**
 * Example of streaming input file to output file using PIPE
 */
function fileStreamingWithPipe() {
    var inputFile = fs.createReadStream('inputFile.txt');
    var outputFile = fs.createWriteStream('output.txt');
    inputFile.pipe(outputFile);
}

/**
 * Example of streaming from Http request to response (Echo server)
 * Also see shortcut below - httpStreamingWithPipe()
 *
 * After server started, invoke
 *  ..\nodejs-howto\Samples>curl --upload-file inputFile.txt http://localhost:9080/
 */
function httpStreaming() {
    var chunkNo = 1;
    http.createServer(function(req, res) {

        res.writeHead(200);

        // Handling data streaming event
        req.on('data', function(dataChunk) {
           // Process data chunk as it becomes available
            console.log('Chunk Number = ' + chunkNo++);
            console.log(dataChunk.toString());
            res.write(dataChunk);
        });

        // Handling end of data streaming event
        req.on('end', function() {
           // close the Http response
            res.end();
        });
    }).listen(9080);    // Listen to Port 9080
    console.log('Listening to port 9080...');
}

/**
 * Example of streaming from Http request to response with PIPE
 *
 * PIPE - handles coordination between the read and write stream, properly handling
 * pause if necessary, when the writable needs to catch-up
 *
 * After server started, invoke
 *  ..\nodejs-howto\Samples>curl --upload-file inputFile.txt http://localhost:9080/
 */
function httpStreamingWithPipe() {
    http.createServer(function(req, res) {
        res.writeHead(200);
        req.pipe(res);
    }).listen(9080);    // Listen to Port 9080
    console.log('Listening to port 9080...');
}

/**
 * Example of Http server that handles file upload
 */
function uploadToHttpServer() {
    http.createServer(function(req, res) {
        var uploadFile = fs.createWriteStream('upload.txt');
        var fileBytes = req.headers['content-length'];
        console.log('Content-length: ' + fileBytes);
        var uploadedBytes = 0;

        req.pipe(uploadFile);

        req.on('data', function(chunk) {
           uploadedBytes += chunk.length;
           var progress = (uploadedBytes/fileBytes) * 100;
           res.write("progress: " + parseInt(progress, 10) + "%\n");
        });
        // Handle successful file upload
        req.on('end', function() {
            //res.writeHead(200);
            res.end('File uploaded');
            console.log('File uploaded.');
        });
    }).listen(9080);    // Listen to Port 9080
    console.log('Listening to port 9080...');
}