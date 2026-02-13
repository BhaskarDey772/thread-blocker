# Thread Blocker

A lightweight npm package to block the Node.js main thread for testing purposes. This is useful for testing timeout behaviors, event loop delays, and other scenarios where you need to simulate a busy main thread.

## Installation

```bash
npm install thread-blocker
```

## Features

- 🚀 Block the main thread for a specified duration
- ⚡ Both async and synchronous blocking methods
- 🎯 CPU-intensive or low-intensity blocking options
- 🔄 Repeat blocking patterns
- 📊 Get information about blocking capabilities
- 🧪 Perfect for testing and development

## Usage

### Basic Blocking

```javascript
const { blockMainThread } = require('thread-blocker');

// Async blocking
async function testBlocking() {
  console.log('Starting block...');
  await blockMainThread(5000); // Block for 5 seconds
  console.log('Block complete!');
}

testBlocking();
```

### Synchronous Blocking

```javascript
const { blockMainThreadSync } = require('thread-blocker');

console.log('Blocking synchronously...');
blockMainThreadSync(3000); // Block for 3 seconds
console.log('Done!');
```

### Advanced Options

```javascript
const { block } = require('thread-blocker');

async function advancedBlocking() {
  await block({
    duration: 2000,
    intensive: true,
    callback: () => {
      console.log('Blocking callback executed');
    }
  });
}

advancedBlocking();
```

### Repeated Blocking

```javascript
const { blockRepeatedly } = require('thread-blocker');

async function repeatedBlocking() {
  // Block 5 times, each for 1 second, with 500ms interval between blocks
  await blockRepeatedly(1000, 5, 500);
  console.log('All blocks complete!');
}

repeatedBlocking();
```

### Get Blocking Info

```javascript
const { getBlockingInfo } = require('thread-blocker');

const info = getBlockingInfo();
console.log(info);
// Output:
// {
//   supported: true,
//   method: 'CPU-intensive blocking',
//   capabilities: [...]
// }
```

## API Reference

### `blockMainThread(duration, intensive)`

Blocks the main thread for the specified duration.

- **duration** (number): Time to block in milliseconds
- **intensive** (boolean, optional): Use CPU-intensive operations (default: true)
- **Returns**: Promise<void>

### `blockMainThreadSync(duration, intensive)`

Synchronously blocks the main thread. ⚠️ Warning: This will block all operations.

- **duration** (number): Time to block in milliseconds
- **intensive** (boolean, optional): Use CPU-intensive operations (default: true)
- **Returns**: void

### `block(options)`

Advanced blocking with options.

- **options** (BlockingOptions):
  - **duration** (number): Time to block in milliseconds
  - **intensive** (boolean, optional): Use CPU-intensive operations (default: true)
  - **callback** (function, optional): Function to call after blocking
- **Returns**: Promise<void>

### `blockRepeatedly(duration, count, interval)`

Performs multiple blocks with optional intervals.

- **duration** (number): Time for each block in milliseconds
- **count** (number): Number of blocks to perform
- **interval** (number, optional): Interval between blocks in milliseconds (default: 0)
- **Returns**: Promise<void>

### `getBlockingInfo()`

Returns information about blocking capabilities.

- **Returns**: Object with blocking info

## Use Cases

- ✅ Testing timeout handlers
- ✅ Simulating slow operations
- ✅ Testing event loop behavior
- ✅ Performance testing
- ✅ Stress testing applications
- ✅ Testing UI responsiveness
- ✅ Debugging event loop issues

## Performance Notes

- **CPU-intensive mode** (default): Uses `Math.sqrt()` in a loop to consume CPU cycles
- **Low-intensity mode**: Uses a busy-wait loop with minimal CPU overhead

## TypeScript Support

This package includes TypeScript definitions for full type support.

```typescript
import { blockMainThread, BlockingOptions } from 'thread-blocker';

async function test() {
  await blockMainThread(5000, true);
}
```

## ⚠️ Warning

**Do not use in production!** This package is designed for testing and development purposes only. Using this in production code will severely impact your application's performance and responsiveness.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues.
