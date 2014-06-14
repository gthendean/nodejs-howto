/**
 * Created on 5/27/2014.
 */

var exec = require("child_process").exec,
    querystring = require("querystring"),
    fs = require("fs");

function home (response) {
    console.log("Request handler 'home' was called.");

    // This is a hack solution to show both Blocking and Non-Blocking server
    var content = '<h1>Node Simple HTTP server</h1>' +
                '<a href="/directory">Directory</a><br/>' +
                '<a href="/form">Simple POST Form</a><br/>' +
                '<a href="/showImage">Show static image</a><br/>' +
                '<a href="/upload">Upload</a>';
    if (response == null) {
        return content;
    } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(content);
        response.end();
    }
}

function form(response, postData) {
    console.log("Request handler 'form' was called.");
    var content = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; '+
        'charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<a href="/">Home</a>' +
        '<form action="/simplePost" method="post">'+
        '<textarea name="enteredText" rows="2" cols="60"></textarea>'+
        '<textarea name="enteredText2" rows="2" cols="60"></textarea>'+
        '<input type="submit" value="Submit text" />'+
        '</form>'+
        '</body>'+
        '</html>';
    if (response == null) {
        return content;
    } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(content);
        response.end();
    }
}

function simplePost(response, postData) {
    console.log("Request handler 'simplePost' was called.");
    if (response == null) {
        return "";
    } else {
        var content = '<a href="/">Home</a><br/>' +
            "You've sent the text: <br/>" +
            "<pre>" + querystring.parse(postData).enteredText + "</pre>";
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(content);
        response.end();
    }
}

// Cannot handling Blocking example!!!
function directory(response) {
    console.log("Request handler 'directory' was called.");
    // Demonstrate Non-Blocking
    exec("dir", { timeout: 10000, maxBuffer: 20000*1024 },
        function (error, stdout, stderr) {
            response.writeHead(200, {"Content-Type": "text/html"});
            var content = '<a href="/">Home</a><pre>' + stdout + '</pre>';
            response.write(content);
            response.end();
    });
}

function upload (response) {
    console.log("Request handler 'upload' was called.");
    var content = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" '+
        'content="text/html; charset=UTF-8" />'+
        '</head>'+
        '<body>'+
        '<a href="/">Home</a>' +
        '<form action="/showImage" enctype="multipart/form-data" '+
        'method="post">'+
        '<input type="file" name="upload"><br/>'+
        '<input type="submit" value="Upload file" />'+
        '</form>'+
        '</body>'+
        '</html>';
    if (response == null) {
        return content;
    } else {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(content);
        response.end();
    }
}

// Cannot handling Blocking example!!!
function showImage(response, postData) {
    console.log("Request handler 'showImage' was called.");
    console.log("Post data: " + postData);

    if ((postData == null) || (postData.length <= 0)) {
        // display static image
        fs.readFile("ballon.png", "binary", function(error, file) {
            if (error) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(error + "\n");
                response.end();
            } else {
                response.writeHead(200, {"Content-Type": "image/png"});
                response.write(file, "binary");
                response.end();
            }
        });
    } else {
        // temp solution
        response.writeHead(200, {"Content-Type": "text/html"});
        var content = '<a href="/">Home</a><br/>' +
            '<h1>Not yet implemented!!</h1><br/>' +
            '<p>See "The Node Beginner Book By Manuel Kiessling" that uses npm install formidable' +
            "</p>";
        response.write(content);
        response.end();
    }
}

exports.home = home;
exports.directory = directory;
exports.form = form;
exports.simplePost = simplePost;
exports.upload = upload;
exports.showImage = showImage;