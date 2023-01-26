export const DIAMETER_TO_RADIUS = 0.5;

export function diameter(
  value: number,
): number {
  return value * DIAMETER_TO_RADIUS;
}
