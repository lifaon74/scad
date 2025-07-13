import { Lines } from '../../misc/lines/lines.ts';
import { Points2dList } from '../types/points-2d-list.ts';
import { transpilePointsList } from './transpile-points-list.ts';

/**
 * Converts a list of 2d points into openscad syntax.
 */
export function transpilePoints2DList(
  list: Points2dList,
): Lines {
  return transpilePointsList(list, 2);
}
