import { transpileNumber } from './transpile-number.ts';
import { Rgba } from '../build/color/rgba.ts';

/**
 * Converts a color value into openscad syntax.
 */
export function transpileRgba(
  [
    r,
    g,
    b,
    a,
  ]: Rgba,
): string {
  return `[${transpileNumber(r)}, ${transpileNumber(g)}, ${transpileNumber(b)}${(a === void 0) ? '' : `, ${transpileNumber(a)}`}]`;
}
