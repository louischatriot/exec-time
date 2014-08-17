function formatTime (millis) {
  var millis = millis / 1e6;

  if (millis < 1000) {
    return millis.toFixed(3) + " ms";
  } else {
    return (Math.floor(millis / 100) / 10) + " s";
  }
}

// get time in ms
function getTime() {
  var t = process.hrtime();
  return (t[0] * 1e9 + t[1]);
}

/**
 * Create a profiler with name testName to monitor the execution time of a route
 * The profiler has two arguments: a step msg and an optional reset for the internal timer
 * It will display the execution time per step and total from latest rest
 *
 * Optional logToConsole flag, which defaults to true, causes steps to be printed to console.
 * otherwise, they can be accessed from Profiler.steps array.
 */
function Profiler (name, logToConsole) {
  this.name = name;
  this.steps = [];
  this.sinceBeginning = null;
  this.lastStep = null;
  this.logToConsole = typeof(logToConsole) === 'undefined' ? true : logToConsole;
}


Profiler.prototype.beginProfiling = function () {
  if (this.logToConsole) { console.log(this.name + ' - Begin profiling'); }
  this.resetTimers();
};


Profiler.prototype.resetTimers = function () {
  this.sinceBeginning = getTime();
  this.lastStep = getTime();
  this.steps.push(['BEGIN_TIMER', this.lastStep])
};


Profiler.prototype.elapsedSinceBeginning = function () {
  return getTime() - this.sinceBeginning;
}


Profiler.prototype.elapsedSinceLastStep = function () {
  return getTime() - this.lastStep;
}

// Return the deltas between steps, in nanoseconds

Profiler.prototype.getSteps = function () {
  return this.steps.map(function(curr, index, arr) {
    if (index === 0) return;
    return [curr[0], (curr[1] - arr[index-1][1])];
  }).slice(1);
}

Profiler.prototype.step = function (msg) {
  if (!this.sinceBeginning || !this.lastStep) {
    console.log(this.name + ' - ' + msg + ' - You must call beginProfiling before registering steps');
    return;
  }

  if (this.logToConsole) { console.log(this.name + " - " + msg + ' - ' + formatTime(this.elapsedSinceLastStep()) + " (total: " + formatTime(this.elapsedSinceBeginning()) + ")"); }

  this.lastStep = getTime();
  this.steps.push([msg, this.lastStep]);
};



module.exports = Profiler;
