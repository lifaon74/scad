import { CM_TO_MM } from './cm-to-mm.ts';

/**
 * Converts a length in "cm" to "mm".
 */
export function cm(
  value: number,
): number {
  return value * CM_TO_MM;
}
