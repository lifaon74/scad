import { Lines } from '../lines.ts';

export function linesToString(
  lines: Lines,
  separator: string = '\n',
): string {
  return lines.join(separator);
}
