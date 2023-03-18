import { ILines } from '../../misc/lines/lines.type.ts';
import { IPoints2dList } from '../types/points-2d-list.type.ts';
import { IPoints3dList } from '../types/points-3d-list.type.ts';
import { transpilePointsList } from './transpile-points-list.ts';

export function transpilePoints3DList(
  list: IPoints3dList,
): ILines {
  return transpilePointsList(list, 3);
}
