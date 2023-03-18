import { ILines } from '../../misc/lines/lines.type.ts';
import { transpileBoolean } from '../misc/transpile-boolean.ts';
import { transpileFunctionBlockMulti } from '../misc/transpile-function-block.ts';
import { optionalFunctionArgument } from '../misc/transpile-function-call.ts';
import { transpileNumber } from '../misc/transpile-number.ts';
import { transpileVector3D } from '../misc/transpile-vector-3d.ts';
import { IVector3d } from '../types/vector-3d.type.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Using_the_2D_Subsystem#Rotate_extrude

// Rotate_extrude(height = 5, center = true, convexity = 10, twist = -fanrot, slices = 20, scale = 1.0, $fn = 16)

// TODO
export interface IRotateExtrudeOptions {
  height: number;
  center?: boolean;
  convexity?: number;
  twist?: number;
  slices?: number;
  scale?: number;
  fragmentNumber?: number;
}

export function rotateExtrude(
  {
    height,
    center = false,
    convexity = 10,
    twist = 0,
    slices,
    scale,
    fragmentNumber,
  }: IRotateExtrudeOptions,
  expressions: ILines[],
): ILines {
  return transpileFunctionBlockMulti(
    'Rotate_extrude',
    [
      ['height', [transpileNumber(height)]],
      ...optionalFunctionArgument(center, (center) => ['center', [transpileBoolean(center)]]),
      ['convexity', [transpileNumber(convexity)]],
      ['twist', [transpileNumber(twist)]],
      ...optionalFunctionArgument(slices, (slices) => ['slices', [transpileNumber(slices)]]),
      ...optionalFunctionArgument(scale, (scale) => ['scale', [transpileNumber(scale)]]),
      ...optionalFunctionArgument(fragmentNumber, (fragmentNumber) => ['$fn', [transpileNumber(fragmentNumber)]]),
    ],
    expressions,
  );
}
