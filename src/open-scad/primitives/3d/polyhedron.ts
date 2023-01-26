import { ILines } from '../../../misc/lines/lines.type.ts';
import { optionalFunctionArgument, transpileFunctionCall } from '../../misc/transpile-function-call.ts';
import { transpileNumber } from '../../misc/transpile-number.ts';
import { transpileNumbersList } from '../../misc/transpile-numbers-list.ts';
import { transpilePoints3DList } from '../../misc/transpile-points-3d-list.ts';
import { INumbersList } from '../../types/numbers-list.type.ts';
import { IPoints3DList } from '../../types/points-3d-list.type.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#polyhedron

export interface IPolyhedronOptions {
  points: IPoints3DList;
  faces: readonly INumbersList[];
  convexity?: number,
}

export function polyhedron(
  {
    points,
    faces, // all faces looked from outside must be clockwise
    convexity,
  }: IPolyhedronOptions,
): ILines {
  return transpileFunctionCall('polyhedron', [
    ['points', transpilePoints3DList(points)],
    ['faces', [`[${faces.map(transpileNumbersList).join(', ')}]`]],
    ...optionalFunctionArgument(convexity, (convexity) => ['convexity', [transpileNumber(convexity)]]),
  ]);
}

