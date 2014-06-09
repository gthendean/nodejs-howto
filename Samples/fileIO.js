/**
 * Created by I824993 on 5/27/2014.
 */

var fs = require('fs');

//Read file SYNCHronously
var contents = fs.readFileSync('inputFile.txt');
console.log(contents);
console.log('SYNCH - Do something else...');

// Read file ASYNCH non-blocking
fs.readFile('inputFile.txt', function(err, contents) {
    console.log(contents);
});
console.log('ASYNCH - Do something else...');
