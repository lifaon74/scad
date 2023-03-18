import { ILines } from '../../misc/lines/lines.type.ts';
import { transpileBoolean } from '../misc/transpile-boolean.ts';
import { transpileFunctionBlockMulti } from '../misc/transpile-function-block.ts';
import { optionalFunctionArgument } from '../misc/transpile-function-call.ts';
import { transpileNumber } from '../misc/transpile-number.ts';
import { transpileVector3D } from '../misc/transpile-vector-3d.ts';
import { IVector3d } from '../types/vector-3d.type.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#offset

export interface IOffset2dOptions {
  radius?: number;
  delta?: number;
  chamfer?: boolean;
}

export function offset2d(
  {
    radius,
    delta,
    chamfer,
  }: IOffset2dOptions,
  expressions: ILines[],
): ILines {
  return transpileFunctionBlockMulti(
    'offset',
    [
      ...optionalFunctionArgument(radius, (radius) => ['radius', [transpileNumber(radius)]]),
      ...optionalFunctionArgument(delta, (delta) => ['delta', [transpileNumber(delta)]]),
      ...optionalFunctionArgument(chamfer, (chamfer) => ['chamfer', [transpileBoolean(chamfer)]]),
    ],
    expressions,
  );
}
