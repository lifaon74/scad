import { Lines } from '../lines.ts';

export function indentLines(
  lines: Lines,
  indent: string = '  ',
): Lines {
  return lines.map((line: string) => `${indent}${line}`);
}
