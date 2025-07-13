import { Vector3d } from '../../../../types/vector-3d.ts';

export function volume(
  [x, y, z]: Vector3d,
): number {
  return x * y * z;
}
