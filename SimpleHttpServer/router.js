/**
 * Created by I824993 on 5/27/2014.
 */

// Blocking route
function block_route (pathname, routes) {
    console.log("Blocking - Routing to '" + pathname + "'...");

    if (typeof routes[pathname] === 'function') {
        return routes[pathname]();
    } else {
        console.log("No request handler found for " + pathname);
        return "404 Not found";
    }
}

// Non-Blocking route
function route (pathname, routes, response, postData) {
    console.log("Routing to '" + pathname + "'...");

    if (typeof routes[pathname] === 'function') {
        return routes[pathname](response, postData);
    } else {
        console.log("No request handler found for " + pathname);
        return "404 Not found";
    }
}

exports.block_route = block_route;
exports.route = route;