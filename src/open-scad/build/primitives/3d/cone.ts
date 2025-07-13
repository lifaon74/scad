import { Lines } from '../../../../misc/lines/lines.ts';
import { transpileBoolean } from '../../../transpile/transpile-boolean.ts';
import { transpileFunctionCall } from '../../../transpile/transpile-function-call.ts';
import { transpileNumber } from '../../../transpile/transpile-number.ts';
import { transpileVector3D } from '../../../transpile/transpile-vector-3d.ts';
import { Vector3d } from '../../../types/vector-3d.ts';
import { optionalFunctionArgument } from '../../../transpile/optional-function-argument.ts';

export interface ConeOptions {
  readonly height: number;
  readonly radiusBottom: number;
  readonly radiusTop: number;
  readonly center?: boolean;
  readonly fragmentAngle?: number;
  readonly fragmentSize?: number;
  readonly fragmentNumber?: number;
}

/**
 * Creates a cone.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#cylinder
 */
export function cone(
  {
    height,
    radiusBottom,
    radiusTop,
    center,
    fragmentAngle,
    fragmentSize,
    fragmentNumber,
  }: ConeOptions,
): Lines {
  return transpileFunctionCall('cylinder', [
    ['h', [transpileNumber(height)]],
    ['r1', [transpileNumber(radiusBottom)]],
    ['r2', [transpileNumber(radiusTop)]],
    ...optionalFunctionArgument(center, (center) => ['center', [transpileBoolean(center)]]),
    ...optionalFunctionArgument(fragmentAngle, (fragmentAngle) => ['$fa', [transpileNumber(fragmentAngle)]]),
    ...optionalFunctionArgument(fragmentSize, (fragmentSize) => ['$fs', [transpileNumber(fragmentSize)]]),
    ...optionalFunctionArgument(fragmentNumber, (fragmentNumber) => ['$fn', [transpileNumber(fragmentNumber)]]),
  ]);
}
