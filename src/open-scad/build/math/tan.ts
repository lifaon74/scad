import { DEG_TO_RAD } from './units/angle/deg-to-rad.ts';

export function tan(
  deg: number,
): number {
  return Math.tan(deg * DEG_TO_RAD);
}
