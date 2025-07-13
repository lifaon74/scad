import { FunctionArgument } from './transpile-function-argument.ts';

/**
 * Returns a list of `FunctionArgument` from a value, if it's defined or not.
 */
export function optionalFunctionArgument<GValue>(
  value: GValue | undefined,
  getArgument: (value: GValue) => FunctionArgument,
): readonly FunctionArgument[] {
  return (value === void 0)
    ? []
    : [getArgument(value)];
}
