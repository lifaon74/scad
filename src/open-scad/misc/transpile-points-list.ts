import { indentLines } from '../../misc/lines/functions/indent-lines.ts';
import { ILines } from '../../misc/lines/lines.type.ts';
import { INumbersList } from '../types/numbers-list.type.ts';
import { transpileNumbersList } from './transpile-numbers-list.ts';

export function transpilePointsList(
  list: INumbersList,
  dimension: number,
): ILines {
  const length: number = list.length;
  const last: number = length - dimension;

  if ((length % dimension) === 0) {
    const lines: ILines = [];

    for (let i = 0; i < length; i += dimension) {
      lines.push(`${transpileNumbersList(list.slice(i, i + dimension))}${(i === last) ? '' : ','}`);
    }

    return [
      `[`,
      ...indentLines(lines),
      `]`,
    ];
  } else {
    throw new Error(`The list of points must have a number of values multiple of ${list}`);
  }
}
