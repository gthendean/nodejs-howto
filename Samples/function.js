/**
 * *******************************************************
 * Passing function Around
 */

// Function to be passed around
function say(word) {
    console.log('You said: ' + word);
}

// Function that executes a function that takes a value
function execute(someFunction, value) {
    someFunction(value);
}

// Sample Usage
execute(say, 'Hello World');

// End of - Passing Function Around
// **********************************************************