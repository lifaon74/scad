import { Lines } from '../../../../misc/lines/lines.ts';
import { transpileFunctionCall } from '../../../transpile/transpile-function-call.ts';
import { transpileNumber } from '../../../transpile/transpile-number.ts';
import { transpileNumbersList } from '../../../transpile/transpile-numbers-list.ts';
import { transpilePoints2DList } from '../../../transpile/transpile-points-2d-list.ts';
import { NumbersList } from '../../../types/numbers-list.ts';
import { Points2dList } from '../../../types/points-2d-list.ts';
import { optionalFunctionArgument } from '../../../transpile/optional-function-argument.ts';

export interface PolygonOptions {
  readonly points: Points2dList;
  readonly path?: readonly NumbersList[];
  readonly convexity?: number,
}

/**
 * Creates a polygon.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Using_the_2D_Subsystem#polygon
 */
export function polygon(
  {
    points,
    path,
    convexity,
  }: PolygonOptions,
): Lines {
  return transpileFunctionCall('polygon', [
    ['points', transpilePoints2DList(points)],
    ...optionalFunctionArgument(path, (path) => ['paths', [`[${path.map(transpileNumbersList).join(', ')}]`]]),
    ...optionalFunctionArgument(convexity, (convexity) => ['convexity', [transpileNumber(convexity)]]),
  ]);
}

