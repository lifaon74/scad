import { IVector3d } from '../types/vector-3d.type.ts';
import { transpileNumbersList } from './transpile-numbers-list.ts';

export function transpileVector3D(
  value: IVector3d,
): string {
  return transpileNumbersList(value);
}
