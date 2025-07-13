import { Lines } from '../../../../misc/lines/lines.ts';
import { transpileFunctionCall } from '../../../transpile/transpile-function-call.ts';
import { transpileNumber } from '../../../transpile/transpile-number.ts';
import { optionalFunctionArgument } from '../../../transpile/optional-function-argument.ts';

export interface SphereOptions {
  readonly radius: number;
  readonly fragmentAngle?: number;
  readonly fragmentSize?: number;
  readonly fragmentNumber?: number;
}

/**
 * Creates a sphere.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#sphere
 */
export function sphere(
  {
    radius,
    fragmentAngle,
    fragmentSize,
    fragmentNumber,
  }: SphereOptions,
): Lines {
  return transpileFunctionCall('sphere', [
    ['r', [transpileNumber(radius)]],
    ...optionalFunctionArgument(fragmentAngle, (fragmentAngle) => ['$fa', [transpileNumber(fragmentAngle)]]),
    ...optionalFunctionArgument(fragmentSize, (fragmentSize) => ['$fs', [transpileNumber(fragmentSize)]]),
    ...optionalFunctionArgument(fragmentNumber, (fragmentNumber) => ['$fn', [transpileNumber(fragmentNumber)]]),
  ]);
}
