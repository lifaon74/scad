import { ILines } from '../../misc/lines/lines.type.ts';
import { difference } from '../../open-scad/modeling/difference.ts';
import { union } from '../../open-scad/modeling/union.ts';
import { debug } from '../../open-scad/modifiers/modifier.ts';
import { repeat } from '../../open-scad/others/repeat.ts';
import { cube } from '../../open-scad/primitives/3d/cube.ts';
import { cylinder } from '../../open-scad/primitives/3d/cylinder.ts';
import { mirror } from '../../open-scad/transformations/mirror.ts';
import { rotate } from '../../open-scad/transformations/rotate.ts';
import { translate } from '../../open-scad/transformations/translate.ts';

/*---*/

export interface IRollingShutterHandleBottomBlockOptions {
  bottomWheelRadius: number;
  bottomWheelHeight: number;
}

export function rollingShutterHandleBottomBlock(
  {
    bottomWheelRadius,
    bottomWheelHeight,
  }: IRollingShutterHandleBottomBlockOptions,
): ILines {
  return union([
    cylinder({
      radius: bottomWheelRadius,
      height: bottomWheelHeight,
      center: true,
      fragmentNumber: 32,
    }),
  ]);
}


/*---*/

export interface IRollingShutterHandleOptions extends //
  IRollingShutterHandleBottomBlockOptions
//
{
}

export function rollingShutterHandle(
  {
    ...options
  }: IRollingShutterHandleOptions,
): ILines {
  return union([
    rollingShutterHandleBottomBlock({
      ...options,
    }),
  ]);
}
