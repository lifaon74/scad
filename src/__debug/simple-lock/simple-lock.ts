import { Lines } from '../../misc/lines/lines.ts';
import { cube } from '../../open-scad/build/primitives/3d/cube.ts';
import { cylinder } from '../../open-scad/build/primitives/3d/cylinder.ts';
import { rotate } from '../../open-scad/build/transformations/rotate.ts';
import { translate } from '../../open-scad/build/transformations/translate.ts';
import { MICRO_OFFSET } from '../../open-scad/build/math/micro-offset.ts';
import { diameter } from '../../open-scad/build/math/units/length/circle/diameter.ts';
import { difference } from '../../open-scad/build/modeling/difference.ts';
import { union } from '../../open-scad/build/modeling/union.ts';
import { debug } from '../../open-scad/build/modifiers/debug.ts';

/*---*/

/*---*/

export interface ISimpleLockFixBlockOptions {
  fixBlockX: number;
  fixBlockY: number;
  fixBlockZ: number;
  fixBlockFixScrewRadius: number;
  fixBlockFixScrewBorderOffset: number;
  fixBlockLockTotalHeight: number;
  lockScrewRadius: number;
  lockWidth: number;
}

export function simpleLockFixBlock(
  {
    fixBlockX,
    fixBlockY,
    fixBlockZ,
    fixBlockFixScrewRadius,
    fixBlockFixScrewBorderOffset,
    lockScrewRadius,
    fixBlockLockTotalHeight,
    lockWidth,
  }: ISimpleLockFixBlockOptions,
): Lines {
  const extra: number = 1;

  const fixScrew = () => {
    return translate([fixBlockX * 0.5 - fixBlockFixScrewBorderOffset, 0, 0], [
      cylinder({
        radius: fixBlockFixScrewRadius,
        height: fixBlockZ + extra * 2,
      }),
    ]);
  };

  const lockScrew = () => {
    return translate([0, 0, -extra], [
      cylinder({
        radius: lockScrewRadius,
        height: fixBlockLockTotalHeight * extra * 2,
      }),
    ]);
  };

  const lockScrewBase = () => {
    return translate([0, 0, MICRO_OFFSET], [
      cylinder({
        radius: diameter(lockWidth),
        height: fixBlockLockTotalHeight - MICRO_OFFSET,
      }),
    ]);
  };

  return difference([
    union([
      translate([fixBlockX * -0.5, fixBlockY * -0.5, 0], [
        cube({
          size: [fixBlockX, fixBlockY, fixBlockZ],
        }),
      ]),
      lockScrewBase(),
    ]),
    debug(
      union([
        rotate([0, 0, 0], [
          fixScrew(),
        ]),
        rotate([0, 0, 180], [
          fixScrew(),
        ]),
        lockScrew(),
      ]),
    ),
  ]);
}

/*---*/

export interface ISimpleLockLockOptions {
  lockScrewRadius: number;
  lockWidth: number;
  lockLength: number;
  lockHeight: number;
  fixBlockLockTotalHeight: number;
}

export function simpleLockLock(
  {
    lockScrewRadius,
    lockWidth,
    lockLength,
    lockHeight,
    fixBlockLockTotalHeight,
  }: ISimpleLockLockOptions,
): Lines {
  const extra: number = 1;

  return translate([0, 0, fixBlockLockTotalHeight + 0.5], [
    difference([
      union([
        translate([lockWidth * -0.5, 0, 0], [
          cube({
            size: [lockWidth, lockLength, lockHeight],
          }),
        ]),

        cylinder({
          radius: diameter(lockWidth),
          height: lockHeight,
        }),
      ]),
      debug(
        translate([0, 0, -extra], [
          cylinder({
            radius: lockScrewRadius,
            height: lockHeight * extra * 2,
          }),
        ]),
      ),
    ]),
  ]);
}
