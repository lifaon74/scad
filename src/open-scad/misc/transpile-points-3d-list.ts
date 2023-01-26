import { ILines } from '../../misc/lines/lines.type.ts';
import { IPoints2DList } from '../types/points-2d-list.type.ts';
import { IPoints3DList } from '../types/points-3d-list.type.ts';
import { transpilePointsList } from './transpile-points-list.ts';

export function transpilePoints3DList(
  list: IPoints3DList,
): ILines {
  return transpilePointsList(list, 3);
}
