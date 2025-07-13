import { Vector3d } from '../types/vector-3d.ts';
import { transpileNumbersList } from './transpile-numbers-list.ts';

/**
 * Converts a vec3 into openscad syntax.
 */
export function transpileVector3D(
  value: Vector3d,
): string {
  return transpileNumbersList(value);
}
