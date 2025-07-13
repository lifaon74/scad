import { Lines } from '../../../../misc/lines/lines.ts';
import { transpileFunctionCall } from '../../../transpile/transpile-function-call.ts';
import { transpileNumber } from '../../../transpile/transpile-number.ts';
import { optionalFunctionArgument } from '../../../transpile/optional-function-argument.ts';

export interface CircleOptions {
  readonly radius: number;
  readonly fragmentAngle?: number;
  readonly fragmentSize?: number;
  readonly fragmentNumber?: number;
}

/**
 * Creates a circle.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Using_the_2D_Subsystem#circle
 */
export function circle(
  {
    radius,
    fragmentAngle,
    fragmentSize,
    fragmentNumber,
  }: CircleOptions,
): Lines {
  return transpileFunctionCall('circle', [
    ['r', [transpileNumber(radius)]],
    ...optionalFunctionArgument(fragmentAngle, (fragmentAngle) => ['$fa', [transpileNumber(fragmentAngle)]]),
    ...optionalFunctionArgument(fragmentSize, (fragmentSize) => ['$fs', [transpileNumber(fragmentSize)]]),
    ...optionalFunctionArgument(fragmentNumber, (fragmentNumber) => ['$fn', [transpileNumber(fragmentNumber)]]),
  ]);
}

