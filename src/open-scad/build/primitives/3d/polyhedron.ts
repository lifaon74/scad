import { Lines } from '../../../../misc/lines/lines.ts';
import { transpileFunctionCall } from '../../../transpile/transpile-function-call.ts';
import { transpileNumber } from '../../../transpile/transpile-number.ts';
import { transpileNumbersList } from '../../../transpile/transpile-numbers-list.ts';
import { transpilePoints3DList } from '../../../transpile/transpile-points-3d-list.ts';
import { NumbersList } from '../../../types/numbers-list.ts';
import { Points3dList } from '../../../types/points-3d-list.ts';
import { optionalFunctionArgument } from '../../../transpile/optional-function-argument.ts';

export interface PolyhedronOptions {
  readonly points: Points3dList;
  readonly faces: readonly NumbersList[];
  readonly convexity?: number,
}

/**
 * Creates a polyhedron.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#polyhedron
 */
export function polyhedron(
  {
    points,
    faces, // all faces looked from outside must be clockwise
    convexity,
  }: PolyhedronOptions,
): Lines {
  return transpileFunctionCall('polyhedron', [
    ['points', transpilePoints3DList(points)],
    ['faces', [`[${faces.map(transpileNumbersList).join(', ')}]`]],
    ...optionalFunctionArgument(convexity, (convexity) => ['convexity', [transpileNumber(convexity)]]),
  ]);
}

