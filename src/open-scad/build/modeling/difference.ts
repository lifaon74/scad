import { Lines } from '../../../misc/lines/lines.ts';
import { transpileFunctionBlockMulti } from '../../transpile/transpile-function-block.ts';

/**
 * Creates a "difference" between many shapes.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/CSG_Modelling#difference
 */
export function difference(
  shapes: readonly Lines[],
): Lines {
  return transpileFunctionBlockMulti(
    'difference',
    [],
    shapes,
  );
}
