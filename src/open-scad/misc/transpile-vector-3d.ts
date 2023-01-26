import { IVector3D } from '../types/vector-3d.type.ts';
import { transpileNumbersList } from './transpile-numbers-list.ts';

export function transpileVector3D(
  value: IVector3D,
): string {
  return transpileNumbersList(value);
}
