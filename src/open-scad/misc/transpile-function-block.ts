import { indentLines } from '../../misc/lines/functions/indent-lines.ts';
import { joinLines } from '../../misc/lines/functions/join-lines.ts';
import { ILines } from '../../misc/lines/lines.type.ts';
import { IFunctionArgument, transpileFunctionArguments } from './transpile-function-call.ts';

export function transpileFunctionBlock(
  name: string,
  args: IFunctionArgument[],
  lines: ILines,
): ILines {
  const argsLines: ILines = transpileFunctionArguments(args);
  const head: ILines = (argsLines.length === 0)
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

export function transpileFunctionBlockMulti(
  name: string,
  args: IFunctionArgument[],
  expressions: ILines[],
): ILines {
  return transpileFunctionBlock(
    name,
    args,
    joinLines(
      expressions,
      ['\n'],
    ),
  );
}
