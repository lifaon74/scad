import { RAD_TO_DEG } from './deg-to-rad.ts';

/**
 * Converts an angle in "rag" to "deg".
 */
export function rad(
  value: number,
): number {
  return value * RAD_TO_DEG;
}
