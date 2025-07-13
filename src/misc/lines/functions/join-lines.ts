import { Lines } from '../lines.ts';
import { inlineLastLines } from './after-last-line.ts';

export function joinLines(
  allLines: Lines[],
  separator: Lines,
): Lines {
  return allLines.flatMap((lines: Lines, index: number): Lines => {
    return (index < (allLines.length - 1))
      ? inlineLastLines(lines, separator)
      : lines;
  });
}
