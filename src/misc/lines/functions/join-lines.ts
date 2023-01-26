import { ILines } from '../lines.type.ts';
import { inlineLastLines } from './after-last-line.ts';

export function joinLines(
  allLines: ILines[],
  separator: ILines,
): ILines {
  return allLines.flatMap((lines: ILines, index: number): ILines => {
    return (index < (allLines.length - 1))
      ? inlineLastLines(lines, separator)
      : lines;
  });
}
