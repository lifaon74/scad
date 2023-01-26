import { linesToString } from '../../misc/lines/functions/lines-to-string.ts';
import { ILines } from '../../misc/lines/lines.type.ts';

export function exportToSCAD(
  path: string,
  lines: ILines,
): Promise<void> {
  return Deno.writeTextFile(path, linesToString(lines), {
    create: true,
  });
}
