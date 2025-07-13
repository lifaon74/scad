import { Lines } from '../../../misc/lines/lines.ts';
import { transpileBoolean } from '../../transpile/transpile-boolean.ts';
import { transpileFunctionBlockMulti } from '../../transpile/transpile-function-block.ts';
import { transpileNumber } from '../../transpile/transpile-number.ts';
import { transpileVector3D } from '../../transpile/transpile-vector-3d.ts';
import { Vector3d } from '../../types/vector-3d.ts';
import { optionalFunctionArgument } from '../../transpile/optional-function-argument.ts';


export interface RotateExtrudeOptions {
  readonly angle: number;
  readonly convexity?: number;
  readonly fragmentAngle?: number;
  readonly fragmentSize?: number;
  readonly fragmentNumber?: number;
}

/**
 * Applies a "rotate-extrude" transformation on a block of code.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Using_the_2D_Subsystem#Rotate_extrude
 */
export function rotateExtrude(
  {
    angle,
    convexity = 10,
    fragmentAngle,
    fragmentSize,
    fragmentNumber,
  }: RotateExtrudeOptions,
  expressions: readonly Lines[],
): Lines {
  return transpileFunctionBlockMulti(
    'rotate_extrude',
    [
      ['angle', [transpileNumber(angle)]],
      ['convexity', [transpileNumber(convexity)]],
      ...optionalFunctionArgument(fragmentAngle, (fragmentAngle) => ['$fa', [transpileNumber(fragmentAngle)]]),
      ...optionalFunctionArgument(fragmentSize, (fragmentSize) => ['$fs', [transpileNumber(fragmentSize)]]),
      ...optionalFunctionArgument(fragmentNumber, (fragmentNumber) => ['$fn', [transpileNumber(fragmentNumber)]]),
    ],
    expressions,
  );
}
