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
function Profiler (name) {
  this.name = name;
}


Profiler.prototype.beginProfiling = function () {
  console.log(this.name + ' - Begin profiling');
  this.resetTimers();
};


Profiler.prototype.resetTimers = function () {
  this.sinceBeginning = new Date();
  this.sinceLastStep = new Date();
};


Profiler.prototype.elapsedSinceBeginning = function () {
  return (new Date()).getTime() - this.sinceBeginning.getTime();
}


Profiler.prototype.elapsedSinceLastStep = function () {
  return (new Date()).getTime() - this.sinceLastStep.getTime();
}


Profiler.prototype.step = function (msg) {
  var elapsedSinceBeginning;

  if (!this.sinceBeginning || !this.sinceLastStep) {
    console.log(this.name + ' - ' + msg + ' - You must call beginProfiling before registering steps');
    return;
  }

  console.log(this.name + " - " + msg + ' - ' + formatTime(this.elapsedSinceLastStep()) + " (total: " + formatTime(this.elapsedSinceBeginning()) + ")");

  this.sinceLastStep = new Date();
};



module.exports = Profiler;
