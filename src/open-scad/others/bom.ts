import { indentLines } from '../../misc/lines/functions/indent-lines.ts';
import { stringToLines } from '../../misc/lines/functions/string-to-lines.ts';
import { ILines } from '../../misc/lines/lines.type.ts';

export interface IBOMOptions {
  title: string;
  description?: string;
  datasheetURL?: string;
  storeURL?: string;
  manufacturer?: string;
  partNumber?: string;
  value?: string;
}

export function bom(
  options: IBOMOptions,
): ILines {
  return [
    `/* BOM`,
    ...indentLines(
      stringToLines(JSON.stringify(options, null, 2)),
    ),
    `*/`,
  ];
}
