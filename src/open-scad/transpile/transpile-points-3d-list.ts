import { Lines } from '../../misc/lines/lines.ts';
import { Points2dList } from '../types/points-2d-list.ts';
import { Points3dList } from '../types/points-3d-list.ts';
import { transpilePointsList } from './transpile-points-list.ts';

/**
 * Converts a list of 3d points into openscad syntax.
 */
export function transpilePoints3DList(
  list: Points3dList,
): Lines {
  return transpilePointsList(list, 3);
}
