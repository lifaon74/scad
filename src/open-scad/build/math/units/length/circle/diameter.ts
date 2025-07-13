import { DIAMETER_TO_RADIUS } from './diameter-to-radius.ts';

/**
 * Converts a diameter into a radius.
 */
export function diameter(
  value: number,
): number {
  return value * DIAMETER_TO_RADIUS;
}
