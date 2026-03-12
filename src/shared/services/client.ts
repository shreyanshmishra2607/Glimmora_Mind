import { delay } from "@/shared/utils";

/**
 * Wraps a mock API call with simulated delay.
 * When switching to real API, replace calls with fetch/axios and remove withDelay.
 */
export async function withDelay<T>(fn: () => Promise<T>): Promise<T> {
  await delay();
  return fn();
}

/** Optional: set to true to simulate random API failures (e.g. for testing error UI). */
export const SIMULATE_ERROR = false;
const ERROR_RATE = 0.05;

export function shouldSimulateError(): boolean {
  return SIMULATE_ERROR && Math.random() < ERROR_RATE;
}
