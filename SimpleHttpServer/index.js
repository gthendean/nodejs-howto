/**
 * Created by I824993 on 5/27/2014.
 * Based on:
 *      The Node Beginner Book
 *      A comprehensive Node.js tutorial
 * By
 *      Manuel Kiessling
 * See Google Drive
 */
var server = require('./server.js');
var router = require('./router.js');
var requestHandlers = require('./requestHandler.js');

// Routing rules (routes)
// "routes" associates "pathname" with "requestHandlers"
var routes = {};
routes["/"] = requestHandlers.home;
routes["/home"] = requestHandlers.home;
routes["/directory"] = requestHandlers.directory;
routes["/form"] = requestHandlers.form;
routes["/simplePost"] = requestHandlers.simplePost;
routes["/upload"] = requestHandlers.upload;
routes["/showImage"] = requestHandlers.showImage;

// Injecting Router route function to the server
server.start(router.route, routes);
