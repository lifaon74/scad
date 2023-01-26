import { IVector2D } from '../types/vector-2d.type.ts';
import { transpileNumbersList } from './transpile-numbers-list.ts';

export function transpileVector2D(
  value: IVector2D,
): string {
  return transpileNumbersList(value);
}
