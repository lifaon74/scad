import { ILines } from '../../../misc/lines/lines.type.ts';
import { IRectangleOptions, rectangle } from './rectangle.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Using_the_2D_Subsystem#square

export interface ISquareOptions extends Omit<IRectangleOptions, 'size'> {
  size: number;
}

export function square(
  {
    size,
    ...options
  }: ISquareOptions,
): ILines {
  return rectangle({
    ...options,
    size: [size, size],
  });
}
