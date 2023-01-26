import { DEG_TO_RAD } from './units/angle/deg-to-rad.ts';

export function cos(
  deg: number,
): number {
  return Math.cos(deg * DEG_TO_RAD);
}
