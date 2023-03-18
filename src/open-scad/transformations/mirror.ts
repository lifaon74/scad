import { ILines } from '../../misc/lines/lines.type.ts';
import { transpileFunctionBlockMulti } from '../misc/transpile-function-block.ts';
import { transpileVector3D } from '../misc/transpile-vector-3d.ts';
import { IVector3d } from '../types/vector-3d.type.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#mirror

export function mirror(
  vector: IVector3d,
  expressions: ILines[],
): ILines {
  return transpileFunctionBlockMulti(
    'mirror',
    [
      ['v', [transpileVector3D(vector)]],
    ],
    expressions,
  );
}
