exec-time
=========

See how much time every step of a node script takes.

```javascript
var execTime = require('exec-time')
  , profiler = execTime('demo1');

profiler('Beginning profiling');
// DB access taking 350ms here
profiler('Accessed DB');
// Data processing taking 850ms
profiler('Processed data');
// Rendering taking 120ms
profiler('Rendered page');

// Output
// demo1 - Beginning profiling - 0ms (total: 0ms)
// demo1 - Accessed DB - 350ms (total: 350ms)
// demo1 - Processed data - 850ms (total: 1.2s)
// demo1 - Rendered page - 120ms (total: 1.3s)
```
