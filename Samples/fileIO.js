/**
 * Created on 5/27/2014.
 *
 * All about File I/O.
 *
 */

var fs = require('fs');

console.log('Examples - File I/O');

run();

function run() {

    var argv = process.argv[2].toLowerCase();
    console.log('argv[2] = ' + argv);

    switch (argv) {
        case 'synch' :
            readFileSynch();
            break;
        case 'asynch':
            readFileASynch();
            break;
        default:
            console.log('[synch | asynch]');
    }
}

/**
 * Read file SYNCHronously
 */
function readFileSynch() {
    var contents = fs.readFileSync('inputFile.txt');
    console.log(contents.toString());
    console.log('SYNCH - Do something else...');
}


/**
 * Read file ASYNCH Non-Blocking
 */
function readFileASynch() {
    fs.readFile('inputFile.txt', function(err, contents) {
        console.log(contents.toString());
    });
    console.log('ASYNCH - Do something else...');
}



