import { Lines } from '../../../misc/lines/lines.ts';
import { transpileFunctionBlockMulti } from '../../transpile/transpile-function-block.ts';

/**
 * Creates a "union" between many shapes.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/CSG_Modelling#union
 */
export function union(
  shapes: readonly Lines[],
): Lines {
  return transpileFunctionBlockMulti(
    'union',
      [],
    shapes,
  );
}
