import { indentLines } from '../../misc/lines/functions/indent-lines.ts';
import { joinLines } from '../../misc/lines/functions/join-lines.ts';
import { Lines } from '../../misc/lines/lines.ts';
import { FunctionArgument } from './transpile-function-argument.ts';
import { transpileFunctionArguments } from './transpile-function-arguments.ts';

/**
 * Converts a function block into openscad syntax.
 */
export function transpileFunctionBlock(
  name: string,
  args: readonly FunctionArgument[],
  lines: Lines,
): Lines {
  const argsLines: Lines = transpileFunctionArguments(args);
  const head: Lines = (argsLines.length === 0)
    ? [
      `${name}() {`,
    ]
    : [
      `${name}(`,
      ...indentLines(transpileFunctionArguments(args)),
      `) {`,
    ];

  return [
    ...head,
    ...indentLines(lines),
    `}`,
  ];
}

/**
 * Like `transpileFunctionBlock` but allows to provide many expressions instead of just one.
 */
export function transpileFunctionBlockMulti(
  name: string,
  args: readonly FunctionArgument[],
  expressions: readonly Lines[],
): Lines {
  return transpileFunctionBlock(
    name,
    args,
    joinLines(
      expressions,
      ['\n'],
    ),
  );
}
