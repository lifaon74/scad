import { ILines } from '../lines.type.ts';

export function indentLines(
  lines: ILines,
  indent: string = '  ',
): ILines {
  return lines.map((line: string) => `${indent}${line}`);
}
