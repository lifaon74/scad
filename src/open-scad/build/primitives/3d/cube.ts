import { Lines } from '../../../../misc/lines/lines.ts';
import { transpileBoolean } from '../../../transpile/transpile-boolean.ts';
import { transpileFunctionCall } from '../../../transpile/transpile-function-call.ts';
import { transpileNumber } from '../../../transpile/transpile-number.ts';
import { transpileVector3D } from '../../../transpile/transpile-vector-3d.ts';
import { Vector3d } from '../../../types/vector-3d.ts';
import { optionalFunctionArgument } from '../../../transpile/optional-function-argument.ts';

export interface CubeOptions {
  readonly size: Vector3d;
  readonly center?: boolean;
}

/**
 * Creates a cube.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#cube
 */
export function cube(
  {
    size,
    center,
  }: CubeOptions,
): Lines {
  return transpileFunctionCall('cube', [
    ['size', [transpileVector3D(size)]],
    ...optionalFunctionArgument(center, (center) => ['center', [transpileBoolean(center)]]),
  ]);
}
