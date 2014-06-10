/**
 * Created on 6/9/2014.
 *
 * Misc Examples to be filed and categorized later (if necessary)
 */

/**
 * setTimeout - START
 *
 * Simulating long process using setTimeout function &
 * demonstrate Event callback.
 */
function simulateLongRunningProcess() {
    console.log('Long running process initiates...');
    setTimeout(function() {
        console.log('Long running process completed.');
    }, 5000);
    console.log('Long running process starts...');
}

simulateLongRunningProcess();

/**
 * setTimeout - END
 */