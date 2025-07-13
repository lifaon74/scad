import { Lines } from '../../misc/lines/lines.ts';
import { inlineLastLines } from '../../misc/lines/functions/after-last-line.ts';

export type FunctionArgument = readonly [
  name: string,
  value: Lines,
];

/**
 * Converts an argument into openscad syntax.
 */
export function transpileFunctionArgument(
  [
    name,
    value,
  ]: FunctionArgument,
): Lines {
  return inlineLastLines(
    [`${ name } = `],
    value,
  );
}
