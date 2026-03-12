/**
 * Simulated network delay for mock APIs (800–1500 ms).
 * Used only by the service layer; remove or disable when switching to real API.
 */
const MIN_DELAY_MS = 800;
const MAX_DELAY_MS = 1500;

export function delay(ms?: number): Promise<void> {
  const duration =
    ms ?? Math.floor(Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS + 1)) + MIN_DELAY_MS;
  return new Promise((resolve) => setTimeout(resolve, duration));
}
