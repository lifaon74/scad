import { ILines } from '../../../../misc/lines/lines.type.ts';
import { union } from '../../../../open-scad/modeling/union.ts';
import { cube } from '../../../../open-scad/primitives/3d/cube.ts';
import { translate } from '../../../../open-scad/transformations/translate.ts';
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
): ILines {
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
