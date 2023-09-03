import { ILines } from '../../misc/lines/lines.type.ts';
import { transpileBoolean } from '../misc/transpile-boolean.ts';
import { transpileFunctionBlockMulti } from '../misc/transpile-function-block.ts';
import { optionalFunctionArgument } from '../misc/transpile-function-call.ts';
import { transpileNumber } from '../misc/transpile-number.ts';
import { transpileVector3D } from '../misc/transpile-vector-3d.ts';
import { IVector3d } from '../types/vector-3d.type.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Using_the_2D_Subsystem#Rotate_extrude


export interface IRotateExtrudeOptions {
  angle: number;
  convexity?: number;
  fragmentAngle?: number;
  fragmentSize?: number;
  fragmentNumber?: number;
}

export function rotateExtrude(
  {
    angle,
    convexity = 10,
    fragmentAngle,
    fragmentSize,
    fragmentNumber,
  }: IRotateExtrudeOptions,
  expressions: ILines[],
): ILines {
  return transpileFunctionBlockMulti(
    'rotate_extrude',
    [
      ['angle', [transpileNumber(angle)]],
      ['convexity', [transpileNumber(convexity)]],
      ...optionalFunctionArgument(fragmentAngle, (fragmentAngle) => ['$fa', [transpileNumber(fragmentAngle)]]),
      ...optionalFunctionArgument(fragmentSize, (fragmentSize) => ['$fs', [transpileNumber(fragmentSize)]]),
      ...optionalFunctionArgument(fragmentNumber, (fragmentNumber) => ['$fn', [transpileNumber(fragmentNumber)]]),
    ],
    expressions,
  );
}
