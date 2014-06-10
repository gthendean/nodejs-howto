/**
 * Created on 5/27/2014.
 *
 * All about File I/O.
 * File I/O is STREAM like Http Request/Response
 *
 */

var fs = require('fs');


/**
 * Synch & ASynch - START
 */
//Read file SYNCHronously
var contents = fs.readFileSync('inputFile.txt');
console.log(contents);
console.log('SYNCH - Do something else...');

// Read file ASYNCH non-blocking
fs.readFile('inputFile.txt', function(err, contents) {
    console.log(contents);
});
console.log('ASYNCH - Do something else...');
/**
 * Synch & ASynch - END
 */



