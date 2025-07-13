import { indentLines } from '../../misc/lines/functions/indent-lines.ts';
import { Lines } from '../../misc/lines/lines.ts';
import { NumbersList } from '../types/numbers-list.ts';
import { transpileNumbersList } from './transpile-numbers-list.ts';

/**
 * Converts a list of points into openscad syntax.
 */
export function transpilePointsList(
  list: NumbersList,
  dimension: number,
): Lines {
  const length: number = list.length;
  const last: number = length - dimension;

  if ((length % dimension) === 0) {
    const lines: Lines = [];

    for (let i: number = 0; i < length; i += dimension) {
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
