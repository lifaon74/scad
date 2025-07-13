import { FunctionArgument, transpileFunctionArgument } from './transpile-function-argument.ts';
import { Lines } from '../../misc/lines/lines.ts';
import { joinLines } from '../../misc/lines/functions/join-lines.ts';

/**
 * Converts a list of arguments into openscad syntax.
 */
export function transpileFunctionArguments(
  args: readonly FunctionArgument[],
): Lines {
  return joinLines(
    args.map(transpileFunctionArgument),
    [','],
  );
}
