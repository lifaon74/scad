import { Lines } from '../../misc/lines/lines.ts';
import { cylinder } from '../../open-scad/build/primitives/3d/cylinder.ts';
import { union } from '../../open-scad/build/modeling/union.ts';

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
): Lines {
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

export interface IRollingShutterHandleOptions extends
  //
  IRollingShutterHandleBottomBlockOptions//
{
}

export function rollingShutterHandle(
  {
    ...options
  }: IRollingShutterHandleOptions,
): Lines {
  return union([
    rollingShutterHandleBottomBlock({
      ...options,
    }),
  ]);
}
