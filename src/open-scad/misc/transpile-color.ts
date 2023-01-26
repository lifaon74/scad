import { IColor } from '../color/color.type.ts';
import { transpileNumber } from './transpile-number.ts';

export function transpileColor(
  [
    r,
    g,
    b,
    a,
  ]: IColor,
): string {
  return `[${transpileNumber(r)}, ${transpileNumber(g)}, ${transpileNumber(b)}${(a === void 0) ? '' : `, ${transpileNumber(a)}`}]`;
}
