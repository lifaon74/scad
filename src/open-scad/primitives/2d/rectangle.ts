import { ILines } from '../../../misc/lines/lines.type.ts';
import { transpileBoolean } from '../../misc/transpile-boolean.ts';
import { optionalFunctionArgument, transpileFunctionCall } from '../../misc/transpile-function-call.ts';
import { transpileNumber } from '../../misc/transpile-number.ts';
import { transpileVector2D } from '../../misc/transpile-vector-2d.ts';
import { transpileVector3D } from '../../misc/transpile-vector-3d.ts';
import { IVector2d } from '../../types/vector-2d.type.ts';
import { IVector3d } from '../../types/vector-3d.type.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Using_the_2D_Subsystem#square

export interface IRectangleOptions {
  size: IVector2d;
  center?: boolean;
}

export function rectangle(
  {
    size,
    center,
  }: IRectangleOptions,
): ILines {
  return transpileFunctionCall('square', [
    ['size', [transpileVector2D(size)]],
    ...optionalFunctionArgument(center, (center) => ['center', [transpileBoolean(center)]]),
  ]);
}
