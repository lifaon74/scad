
import { ILines } from '../../misc/lines/lines.type.ts';
import { transpileFunctionBlockMulti } from '../misc/transpile-function-block.ts';
import { transpileNumber } from '../misc/transpile-number.ts';
import { transpileVector3D } from '../misc/transpile-vector-3d.ts';
import { IVector3D } from '../types/vector-3d.type.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#rotate

export function rotate(
  vector: IVector3D,
  expressions: ILines[],
): ILines {
  return transpileFunctionBlockMulti(
    'rotate',
    [
      ['a', [transpileVector3D(vector)]],
    ],
    expressions,
  );
}

export interface IRotateAroundOptions {
  angle: number;
  vector: IVector3D;
}

export function rotateAround(
  {
    angle,
    vector,
  }: IRotateAroundOptions,
  expressions: ILines[],
): ILines {
  return transpileFunctionBlockMulti(
    'rotate',
    [
      ['a', [transpileNumber(angle)]],
      ['v', [transpileVector3D(vector)]],
    ],
    expressions,
  );
}

