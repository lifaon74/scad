import { Lines } from '../../../../misc/lines/lines.ts';
import { union } from '../../../../open-scad/modeling/union.ts';
import { cube } from '../../../../open-scad/build/primitives/3d/cube.ts';
import { translate } from '../../../../open-scad/build/transformations/translate.ts';
import { IScrewNutExternalOptions, screwHexNutExternal } from './screw-hex-nut.ts';

export interface IScrewHeyNutSideInsertOptions extends IScrewNutExternalOptions {
  insertLength: number;
}

export function screwHexNutSideInsert(
  {
    radius,
    height,
    insertLength,
    ...options
  }: IScrewHeyNutSideInsertOptions,
): Lines {
  return union([
    screwHexNutExternal({
      ...options,
      radius,
      height,
    }),
    translate([insertLength * 0.5, 0, 0], [
      cube({
        size: [insertLength, radius * 2, height],
        center: true,
      }),
    ]),
  ]);
}
