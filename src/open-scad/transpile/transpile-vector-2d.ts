import { Vector2d } from '../types/vector-2d.ts';
import { transpileNumbersList } from './transpile-numbers-list.ts';

/**
 * Converts a vec2 into openscad syntax.
 */
export function transpileVector2D(
  value: Vector2d,
): string {
  return transpileNumbersList(value);
}
