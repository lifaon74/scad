import { Lines } from '../../../misc/lines/lines.ts';
import { transpileFunctionBlockMulti } from '../../transpile/transpile-function-block.ts';
import { transpileNumber } from '../../transpile/transpile-number.ts';
import { transpileVector3D } from '../../transpile/transpile-vector-3d.ts';
import { Vector3d } from '../../types/vector-3d.ts';

/**
 * Applies a "rotate" transformation on a block of code.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#rotate
 */
export function rotate(
  vector: Vector3d,
  expressions: readonly Lines[],
): Lines {
  return transpileFunctionBlockMulti(
    'rotate',
    [
      ['a', [transpileVector3D(vector)]],
    ],
    expressions,
  );
}

export interface RotateAroundOptions {
  readonly angle: number;
  readonly vector: Vector3d;
}

export function rotateAround(
  {
    angle,
    vector,
  }: RotateAroundOptions,
  expressions: readonly Lines[],
): Lines {
  return transpileFunctionBlockMulti(
    'rotate',
    [
      ['a', [transpileNumber(angle)]],
      ['v', [transpileVector3D(vector)]],
    ],
    expressions,
  );
}

