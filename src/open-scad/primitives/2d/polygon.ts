import { ILines } from '../../../misc/lines/lines.type.ts';
import { optionalFunctionArgument, transpileFunctionCall } from '../../misc/transpile-function-call.ts';
import { transpileNumber } from '../../misc/transpile-number.ts';
import { transpileNumbersList } from '../../misc/transpile-numbers-list.ts';
import { transpilePoints2DList } from '../../misc/transpile-points-2d-list.ts';
import { INumbersList } from '../../types/numbers-list.type.ts';
import { IPoints2dList } from '../../types/points-2d-list.type.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Using_the_2D_Subsystem#polygon

export interface IPolygonOptions {
  readonly points: IPoints2dList;
  readonly path?: readonly INumbersList[];
  readonly convexity?: number,
}

export function polygon(
  {
    points,
    path,
    convexity,
  }: IPolygonOptions,
): ILines {
  return transpileFunctionCall('polygon', [
    ['points', transpilePoints2DList(points)],
    ...optionalFunctionArgument(path, (path) => ['paths', [`[${path.map(transpileNumbersList).join(', ')}]`]]),
    ...optionalFunctionArgument(convexity, (convexity) => ['convexity', [transpileNumber(convexity)]]),
  ]);
}

