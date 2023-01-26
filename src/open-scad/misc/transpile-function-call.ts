import { inlineLastLines } from '../../misc/lines/functions/after-last-line.ts';
import { indentLines } from '../../misc/lines/functions/indent-lines.ts';
import { joinLines } from '../../misc/lines/functions/join-lines.ts';
import { ILines } from '../../misc/lines/lines.type.ts';

export type IFunctionArgument = [
  name: string,
  value: ILines,
];

export function transpileFunctionArgument(
  [
    name,
    value,
  ]: IFunctionArgument,
): ILines {
  return inlineLastLines(
    [`${name} = `],
    value,
  );
}

export function optionalFunctionArgument<GValue>(
  value: GValue | undefined,
  getArgument: (value: GValue) => IFunctionArgument,
): IFunctionArgument[] {
  return (value === void 0)
    ? []
    : [getArgument(value)];
}

export function transpileFunctionArguments(
  args: IFunctionArgument[],
): ILines {
  return joinLines(
    args.map(transpileFunctionArgument),
    [','],
  );
}

export function transpileFunctionCall(
  name: string,
  args: IFunctionArgument[],
): ILines {
  return [
    `${name}(`,
    ...indentLines(
      transpileFunctionArguments(args),
    ),
    `);`,
  ];
}
