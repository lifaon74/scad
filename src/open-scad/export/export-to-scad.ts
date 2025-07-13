import { linesToString } from '../../misc/lines/functions/lines-to-string.ts';
import { Lines } from '../../misc/lines/lines.ts';

export function exportToScad(
  path: string,
  lines: Lines,
): Promise<void> {
  return Deno.writeTextFile(path, linesToString(lines), {
    create: true,
  });
}
