import { ILines } from '../../../misc/lines/lines.type.ts';
import { transpileBoolean } from '../../misc/transpile-boolean.ts';
import { optionalFunctionArgument, transpileFunctionCall } from '../../misc/transpile-function-call.ts';
import { transpileNumber } from '../../misc/transpile-number.ts';
import { transpileVector3D } from '../../misc/transpile-vector-3d.ts';
import { IVector3D } from '../../types/vector-3d.type.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#cube

export interface ICubeOptions {
  size: IVector3D;
  center?: boolean;
}

export function cube(
  {
    size,
    center,
  }: ICubeOptions,
): ILines {
  return transpileFunctionCall('cube', [
    ['size', [transpileVector3D(size)]],
    ...optionalFunctionArgument(center, (center) => ['center', [transpileBoolean(center)]]),
  ]);
}
