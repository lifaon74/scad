import { DEG_TO_RAD } from './units/angle/deg-to-rad.ts';

export function sin(
  deg: number,
): number {
  return Math.sin(deg * DEG_TO_RAD);
}
