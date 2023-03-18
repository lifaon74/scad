import { IVector2d } from '../types/vector-2d.type.ts';
import { transpileNumbersList } from './transpile-numbers-list.ts';

export function transpileVector2D(
  value: IVector2d,
): string {
  return transpileNumbersList(value);
}
