import { Lines } from '../../../../misc/lines/lines.ts';
import { transpileBoolean } from '../../../transpile/transpile-boolean.ts';
import { transpileFunctionCall } from '../../../transpile/transpile-function-call.ts';
import { transpileNumber } from '../../../transpile/transpile-number.ts';
import { transpileVector2D } from '../../../transpile/transpile-vector-2d.ts';
import { transpileVector3D } from '../../../transpile/transpile-vector-3d.ts';
import { Vector2d } from '../../../types/vector-2d.ts';
import { Vector3d } from '../../../types/vector-3d.ts';
import { optionalFunctionArgument } from '../../../transpile/optional-function-argument.ts';

export interface RectangleOptions {
  readonly size: Vector2d;
  readonly center?: boolean;
}

/**
 * Creates a rectangle.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Using_the_2D_Subsystem#square
 */
export function rectangle(
  {
    size,
    center,
  }: RectangleOptions,
): Lines {
  return transpileFunctionCall('square', [
    ['size', [transpileVector2D(size)]],
    ...optionalFunctionArgument(center, (center) => ['center', [transpileBoolean(center)]]),
  ]);
}
