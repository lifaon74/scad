import { ILines } from '../../misc/lines/lines.type.ts';

export function group(
  lines: ILines[],
): ILines {
  return lines.flat();
}
