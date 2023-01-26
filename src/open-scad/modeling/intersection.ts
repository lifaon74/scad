import { ILines } from '../../misc/lines/lines.type.ts';
import { transpileFunctionBlockMulti } from '../misc/transpile-function-block.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/CSG_Modelling#intersection

export function intersection(
  shapes: ILines[],
): ILines {
  return transpileFunctionBlockMulti(
    'intersection',
    [],
    shapes,
  );
}
