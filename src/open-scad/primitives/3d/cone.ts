import { ILines } from '../../../misc/lines/lines.type.ts';
import { transpileBoolean } from '../../misc/transpile-boolean.ts';
import { optionalFunctionArgument, transpileFunctionCall } from '../../misc/transpile-function-call.ts';
import { transpileNumber } from '../../misc/transpile-number.ts';
import { transpileVector3D } from '../../misc/transpile-vector-3d.ts';
import { IVector3D } from '../../types/vector-3d.type.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#cylinder

export interface IConeOptions {
  height: number;
  radiusBottom: number;
  radiusTop: number;
  center?: boolean;
  fragmentAngle?: number;
  fragmentSize?: number;
  fragmentNumber?: number;
}

export function cone(
  {
    height,
    radiusBottom,
    radiusTop,
    center,
    fragmentAngle,
    fragmentSize,
    fragmentNumber,
  }: IConeOptions,
): ILines {
  return transpileFunctionCall('cylinder', [
    ['h', [transpileNumber(height)]],
    ['r1', [transpileNumber(radiusBottom)]],
    ['r2', [transpileNumber(radiusTop)]],
    ...optionalFunctionArgument(center, (center) => ['center', [transpileBoolean(center)]]),
    ...optionalFunctionArgument(fragmentAngle, (fragmentAngle) => ['$fa', [transpileNumber(fragmentAngle)]]),
    ...optionalFunctionArgument(fragmentSize, (fragmentSize) => ['$fs', [transpileNumber(fragmentSize)]]),
    ...optionalFunctionArgument(fragmentNumber, (fragmentNumber) => ['$fn', [transpileNumber(fragmentNumber)]]),
  ]);
}
