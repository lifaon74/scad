import { ILines } from '../../misc/lines/lines.type.ts';
import { transpileFunctionBlockMulti } from '../misc/transpile-function-block.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Transformations#fill

export function fill(
  expressions: ILines[],
): ILines {
  return transpileFunctionBlockMulti(
    'fill',
    [],
    expressions,
  );
}
