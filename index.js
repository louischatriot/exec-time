function formatTime (millis) {
  var millis = millis / 1e6;

  if (millis < 1000) {
    return millis + " ms";
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
 */
function Profiler (name) {
  this.name = name;
  this.steps = [];
  this.sinceBeginning = null;
  this.lastStep = null;
}


Profiler.prototype.beginProfiling = function () {
  console.log(this.name + ' - Begin profiling');
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


Profiler.prototype.step = function (msg) {
  if (!this.sinceBeginning || !this.lastStep) {
    console.log(this.name + ' - ' + msg + ' - You must call beginProfiling before registering steps');
    return;
  }

  console.log(this.name + " - " + msg + ' - ' + formatTime(this.elapsedSinceLastStep()) + " (total: " + formatTime(this.elapsedSinceBeginning()) + ")");

  this.lastStep = getTime();
  this.steps.push([msg, this.lastStep]);
};



module.exports = Profiler;
