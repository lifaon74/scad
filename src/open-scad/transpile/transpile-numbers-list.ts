import { NumbersList } from '../types/numbers-list.ts';
import { transpileNumber } from './transpile-number.ts';

/**
 * Converts a list of numbers into openscad syntax.
 */
export function transpileNumbersList(
  list: NumbersList,
): string {
  return `[${list.map(transpileNumber).join(', ')}]`;
}
