import { ILines } from '../../misc/lines/lines.type.ts';
import { transpileColor } from '../misc/transpile-color.ts';
import { transpileFunctionBlockMulti } from '../misc/transpile-function-block.ts';
import { transpileVector3D } from '../misc/transpile-vector-3d.ts';
import { IColor } from '../color/color.type.ts';
import { IVector3d } from '../types/vector-3d.type.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#color


export function color(
  color: IColor,
  expressions: ILines[],
): ILines {
  return transpileFunctionBlockMulti(
    'color',
    [
      ['c', [transpileColor(color)]],
    ],
    expressions,
  );
}
