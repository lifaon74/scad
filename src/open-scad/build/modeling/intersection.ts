import { Lines } from '../../../misc/lines/lines.ts';
import { transpileFunctionBlockMulti } from '../../transpile/transpile-function-block.ts';

/**
 * Creates an "intersection" between many shapes.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/CSG_Modelling#intersection
 */
export function intersection(
  shapes: readonly Lines[],
): Lines {
  return transpileFunctionBlockMulti(
    'intersection',
    [],
    shapes,
  );
}
