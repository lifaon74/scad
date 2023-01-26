import { ILines } from '../../../misc/lines/lines.type.ts';
import { optionalFunctionArgument, transpileFunctionCall } from '../../misc/transpile-function-call.ts';
import { transpileNumber } from '../../misc/transpile-number.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Using_the_2D_Subsystem#circle

export interface ICircleOptions {
  radius: number;
  fragmentAngle?: number;
  fragmentSize?: number;
  fragmentNumber?: number;
}

export function circle(
  {
    radius,
    fragmentAngle,
    fragmentSize,
    fragmentNumber,
  }: ICircleOptions,
): ILines {
  return transpileFunctionCall('circle', [
    ['r', [transpileNumber(radius)]],
    ...optionalFunctionArgument(fragmentAngle, (fragmentAngle) => ['$fa', [transpileNumber(fragmentAngle)]]),
    ...optionalFunctionArgument(fragmentSize, (fragmentSize) => ['$fs', [transpileNumber(fragmentSize)]]),
    ...optionalFunctionArgument(fragmentNumber, (fragmentNumber) => ['$fn', [transpileNumber(fragmentNumber)]]),
  ]);
}

