import { INumbersList } from '../types/numbers-list.type.ts';
import { transpileNumber } from './transpile-number.ts';

export function transpileNumbersList(
  list: INumbersList,
): string {
  return `[${list.map(transpileNumber).join(', ')}]`;
}
