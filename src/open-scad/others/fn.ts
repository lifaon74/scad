import { ILines } from '../../misc/lines/lines.type.ts';
import { transpileNumber } from '../misc/transpile-number.ts';

export function $fn(
  value: number,
): ILines {
  return [
    `$fn = ${transpileNumber(value)};`,
  ];
}
