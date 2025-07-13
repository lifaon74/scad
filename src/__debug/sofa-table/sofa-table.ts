import { Lines } from '../../misc/lines/lines.ts';
import { diameter } from '../../open-scad/math/units/diameter-to-radius.ts';
import { difference } from '../../open-scad/modeling/difference.ts';
import { union } from '../../open-scad/modeling/union.ts';
import { $fn } from '../../open-scad/build/others/fn.ts';
import { cube } from '../../open-scad/build/primitives/3d/cube.ts';
import { cylinder } from '../../open-scad/build/primitives/3d/cylinder.ts';
import { rotate } from '../../open-scad/build/transformations/rotate.ts';
import { round3d } from '../../open-scad/build/transformations/round-3d.ts';
import { translate } from '../../open-scad/build/transformations/translate.ts';
import { Vector3d } from '../../open-scad/types/vector-3d.ts';

export interface ISofaTableFootOptions {
  footSize: Vector3d;
}

export function sofaTableFoot(
  {
    footSize,
  }: ISofaTableFootOptions,
): Lines {
  const height = footSize[2] - footSize[0];

  const roundEnd = () => {
    return rotate([90, 0, 0], [
      cylinder({
        radius: diameter(footSize[0]),
        height: footSize[1],
        center: true,
      }),
    ]);
  };

  return difference([
    union([
      $fn(4),
      round3d({ radius: 2 }, [
        roundEnd(),
        translate([0, 0, -(height / 2)], [
          cube({ size: [footSize[0], footSize[1], height], center: true }),
        ]),
      ]),
    ]),
    rotate([90, 0, 0], [
      cylinder({
        radius: diameter(3),
        height: 20,
        center: true,
      }),
    ]),
  ]);
}
