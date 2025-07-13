import { indentLines } from '../../misc/lines/functions/indent-lines.ts';
import { Lines } from '../../misc/lines/lines.ts';
import { FunctionArgument } from './transpile-function-argument.ts';
import { transpileFunctionArguments } from './transpile-function-arguments.ts';

/**
 * Converts a function call into openscad syntax.
 */
export function transpileFunctionCall(
  name: string,
  args: readonly FunctionArgument[],
): Lines {
  return [
    `${name}(`,
    ...indentLines(
      transpileFunctionArguments(args),
    ),
    `);`,
  ];
}
