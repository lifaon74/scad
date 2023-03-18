import { ILines } from '../../misc/lines/lines.type.ts';
import { transpileFunctionBlockMulti } from '../misc/transpile-function-block.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#minkowski

export function minkowski(
  expressions: ILines[],
): ILines {
  return transpileFunctionBlockMulti(
    'minkowski',
    [],
    expressions,
  );
}
