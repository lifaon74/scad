import { indentLines } from '../../misc/lines/functions/indent-lines.ts';
import { joinLines } from '../../misc/lines/functions/join-lines.ts';
import { ILines } from '../../misc/lines/lines.type.ts';
import { transpileFunctionBlock, transpileFunctionBlockMulti } from '../misc/transpile-function-block.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/CSG_Modelling#union

export function union(
  shapes: ILines[],
): ILines {
  return transpileFunctionBlockMulti(
    'union',
      [],
    shapes,
  );
}
