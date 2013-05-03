function formatTime (millis) {
  if (millis < 1000) {
    return millis + "ms";
  } else {
    return (Math.floor(millis / 100) / 10) + "s";
  }
}


/**
 * Create a profiler with name testName to monitor the execution time of a route
 * The profiler has two arguments: a step msg and an optional reset for the internal timer
 * It will display the execution time per step and total from latest rest
 */
function profiler (testName) {
  var begin
    , lastStep;

  return function (msg, reset) {
    var elapsed;

    if (!begin) { begin = new Date(); }
    if (!lastStep) { lastStep = new Date(); }

    elapsedTotal = (new Date()).getTime() - begin.getTime();
    elapsedStep = (new Date()).getTime() - lastStep.getTime();

    lastStep = new Date();
    if (reset) { begin = new Date(); }

    console.log(testName + " - " + msg + ' - ' + formatTime(elapsedStep) + " (total: " + formatTime(elapsedTotal) + ")");
  };
}


module.exports = profiler;
