import { Lines } from '../../../misc/lines/lines.ts';
import { transpileRgba } from '../../transpile/transpile-rgba.ts';
import { transpileFunctionBlockMulti } from '../../transpile/transpile-function-block.ts';
import { Rgba } from '../color/rgba.ts';


/**
 * Defines a "color" for a block of code.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#color
 */
export function color(
  color: Rgba,
  expressions: readonly Lines[],
): Lines {
  return transpileFunctionBlockMulti(
    'color',
    [
      ['c', [transpileRgba(color)]],
    ],
    expressions,
  );
}
