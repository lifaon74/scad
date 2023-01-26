import { ILines } from '../../../misc/lines/lines.type.ts';
import { optionalFunctionArgument, transpileFunctionCall } from '../../misc/transpile-function-call.ts';
import { transpileNumber } from '../../misc/transpile-number.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#sphere

export interface ISphereOptions {
  radius: number;
  fragmentAngle?: number;
  fragmentSize?: number;
  fragmentNumber?: number;
}

export function sphere(
  {
    radius,
    fragmentAngle,
    fragmentSize,
    fragmentNumber,
  }: ISphereOptions,
): ILines {
  return transpileFunctionCall('sphere', [
    ['r', [transpileNumber(radius)]],
    ...optionalFunctionArgument(fragmentAngle, (fragmentAngle) => ['$fa', [transpileNumber(fragmentAngle)]]),
    ...optionalFunctionArgument(fragmentSize, (fragmentSize) => ['$fs', [transpileNumber(fragmentSize)]]),
    ...optionalFunctionArgument(fragmentNumber, (fragmentNumber) => ['$fn', [transpileNumber(fragmentNumber)]]),
  ]);
}
