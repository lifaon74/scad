import { Lines } from '../../../misc/lines/lines.ts';
import { transpileFunctionBlockMulti } from '../../transpile/transpile-function-block.ts';
import { transpileVector3D } from '../../transpile/transpile-vector-3d.ts';
import { Vector3d } from '../../types/vector-3d.ts';


/**
 * Applies a "mirror" transformation on a block of code.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#mirror
 */
export function mirror(
  vector: Vector3d,
  expressions: readonly Lines[],
): Lines {
  return transpileFunctionBlockMulti(
    'mirror',
    [
      ['v', [transpileVector3D(vector)]],
    ],
    expressions,
  );
}
