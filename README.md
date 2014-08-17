exec-time
=========

See how much time every step of a node script takes, with nanosecond precision.

```javascript
var execTime = require('exec-time')
  , profiler = new execTime('demo1');

profiler.beginProfiling();
// DB access taking 350ms here
profiler.step('Accessed DB');
// Data processing taking 850ms
profiler.step('Processed data');
// Rendering taking 120ms
profiler.step('Rendered page');

/* Output
demo1 - Beginning profiling
demo1 - Accessed DB - 350ms (total: 350ms)
demo1 - Processed data - 850ms (total: 1.2s)
demo1 - Rendered page - 120ms (total: 1.3s)
*/
```

You can disable logging to the console by passing in `false` after the timer name and access the steps later.  

```javascript
var execTime = require('exec-time')
  , profiler = new execTime('demo2', false);

profiler.beginProfiling();
// DB access taking 350ms here
profiler.step('Accessed DB');
// Data processing taking 850ms
profiler.step('Processed data');
// Rendering taking 120ms
profiler.step('Rendered page');

console.log(profiler.getSteps());

/* Output
[ [ 'Accessed DB', 350 ],
  [ 'Processed data', 850 ],
  [ 'Rendered page', 120 ] ]
*/
```

The third paramter to `execTime()` is `precision`, which you can set to `ms` or `ns`, to show times in milliseconds or nanoseconds, respectively.

You can reset the timer by using the `resetTimers` function:

```javascript
var execTime = require('exec-time')
  , profiler = new execTime('demo2');

profiler.beginProfiling();
// DB access taking 350ms here
profiler.step('Accessed DB');
// Data processing taking 850ms
profiler.step('Processed data');
profiler.resetTimers();
// Rendering taking 120ms
profiler.step('Rendered page');

/* Output
demo2 - Beginning profiling
demo2 - Accessed DB - 350ms (total: 350ms)
demo2 - Processed data - 850ms (total: 1.2s)
demo2 - Rendered page - 120ms (total: 120ms)   // Timers were reset
*/
```

You can directly access the current timer values (in nanoseconds) with the
`elapsedSinceBeginning` and `elapsedSinceLastStep` methods:

```javascript
var execTime = require('exec-time')
  , profiler = new execTime('demo3');

profiler.beginProfiling();
// DB access taking 350ms here
profiler.step('Accessed DB');
// Data processing taking 850ms
profiler.step('Processed data');
console.log("Number of ms since the last step: " + profiler.elapsedSinceLastStep());
console.log("Number of ms since the beginning: " + profiler.elapsedSinceBeginning());

/* Output
demo3 - Beginning profiling
demo3 - Accessed DB - 350ms (total: 350ms)
demo3 - Processed data - 850ms (total: 1.2s)
Number of ms since the last step: 850
Number of ms since the beginning: 1200
*/

```
