import { ILines } from '../../misc/lines/lines.type.ts';
import { union } from '../modeling/union.ts';

export interface IRepeatCallback {
  (
    index: number,
  ): ILines;
}

export function repeat(
  count: number,
  callback: IRepeatCallback,
): ILines {
  return union(
    Array.from({ length: count }, (_, index: number) => callback(index)),
  );
}

// export function repeat(
//   count: number,
//   callback: IRepeatCallback,
// ): ILines {
//   const lines: ILines[] = [];
//
//   for (let i = 0; i < count; i++) {
//     lines.push(callback(i));
//   }
//
//   return union(lines);
// }
