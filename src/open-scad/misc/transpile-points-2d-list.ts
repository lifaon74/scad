import { ILines } from '../../misc/lines/lines.type.ts';
import { IPoints2DList } from '../types/points-2d-list.type.ts';
import { transpilePointsList } from './transpile-points-list.ts';

export function transpilePoints2DList(
  list: IPoints2DList,
): ILines {
  return transpilePointsList(list, 2);
}
