/**
 * Example usage of the thread-blocker package
 * This demonstrates various ways to block the main thread for testing
 */

const {
  blockMainThread,
  blockMainThreadSync,
  block,
  blockRepeatedly,
  getBlockingInfo,
} = require("../dist/index");

async function main() {
  console.log("=== Thread Blocker Examples ===\n");

  // Get blocking info
  console.log("1. Getting blocking info:");
  const info = getBlockingInfo();
  console.log(info);
  console.log("");

  // Example 1: Basic async blocking
  console.log("2. Basic async blocking (2 seconds):");
  console.time("blockMainThread");
  await blockMainThread(2000);
  console.timeEnd("blockMainThread");
  console.log("");

  // Example 2: Advanced blocking with callback
  console.log("3. Advanced blocking with callback (1.5 seconds):");
  console.time("block");
  await block({
    duration: 1500,
    intensive: true,
    callback: () => {
      console.log("   -> Callback executed after blocking");
    },
  });
  console.timeEnd("block");
  console.log("");

  // Example 3: Repeated blocking
  console.log("4. Repeated blocking (3 blocks of 1 second with 500ms interval):");
  console.time("blockRepeatedly");
  await blockRepeatedly(1000, 3, 500);
  console.timeEnd("blockRepeatedly");
  console.log("");

  // Example 4: Synchronous blocking
  console.log("5. Synchronous blocking (1 second):");
  console.time("blockMainThreadSync");
  blockMainThreadSync(1000);
  console.timeEnd("blockMainThreadSync");
  console.log("");

  // Example 5: Low-intensity blocking
  console.log("6. Low-intensity blocking (2 seconds):");
  console.time("lowIntensity");
  await blockMainThread(2000, false);
  console.timeEnd("lowIntensity");
  console.log("");

  console.log("=== All examples completed! ===");
}

main().catch(console.error);
