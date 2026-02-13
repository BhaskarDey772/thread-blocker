/**
 * Interface for blocking options
 */
export interface BlockingOptions {
  /** Duration to block in milliseconds */
  duration: number;
  /** Whether to use a synchronous CPU-intensive operation */
  intensive?: boolean;
  /** Optional callback to execute after blocking is complete */
  callback?: () => void;
}

/**
 * Blocks the main thread for a specified duration using CPU-intensive operations
 * @param duration - Duration to block in milliseconds
 * @param intensive - Whether to use CPU-intensive operations (default: true)
 * @returns Promise that resolves after the blocking period
 */
export function blockMainThread(
  duration: number,
  intensive: boolean = true
): Promise<void> {
  return new Promise((resolve) => {
    const startTime = Date.now();

    if (intensive) {
      while (Date.now() - startTime < duration) {
        Math.sqrt(Math.random() * 1000000);
      }
    } else {
      const buffer = new SharedArrayBuffer(4);
      const view = new Int32Array(buffer);
      Atomics.wait(view, 0, 0, duration);
    }

    resolve();
  });
}

/**
 * Synchronously blocks the main thread for a specified duration
 * @param duration - Duration to block in milliseconds
 * @param intensive - Whether to use CPU-intensive operations (default: true)
 * @throws Will block all operations on the main thread
 */
export function blockMainThreadSync(
  duration: number,
  intensive: boolean = true
): void {
  const startTime = Date.now();

  if (intensive) {
    while (Date.now() - startTime < duration) {
      Math.sqrt(Math.random() * 1000000);
    }
  } else {
    while (Date.now() - startTime < duration) {
      // block
    }
  }
}

/**
 * Blocks the main thread with advanced options
 * @param options - Blocking options
 * @returns Promise that resolves after the blocking period
 */
export async function block(options: BlockingOptions): Promise<void> {
  const { duration, intensive = true, callback } = options;

  await blockMainThread(duration, intensive);

  if (callback) {
    callback();
  }
}

/**
 * Creates a repeating block pattern on the main thread
 * @param duration - Duration of each block in milliseconds
 * @param count - Number of blocks to perform
 * @param interval - Interval between blocks in milliseconds (default: 0)
 * @returns Promise that resolves after all blocks are complete
 */
export async function blockRepeatedly(
  duration: number,
  count: number,
  interval: number = 0
): Promise<void> {
  for (let i = 0; i < count; i++) {
    await blockMainThread(duration);

    if (i < count - 1 && interval > 0) {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, interval);
      });
    }
  }
}

/**
 * Gets information about the current blocking capability
 * @returns Object with information about blocking capability
 */
export function getBlockingInfo(): {
  supported: boolean;
  method: string;
  capabilities: string[];
} {
  return {
    supported: true,
    method: "CPU-intensive blocking",
    capabilities: [
      "blockMainThread - async blocking",
      "blockMainThreadSync - synchronous blocking",
      "block - advanced blocking with options",
      "blockRepeatedly - repeated blocking pattern",
    ],
  };
}

