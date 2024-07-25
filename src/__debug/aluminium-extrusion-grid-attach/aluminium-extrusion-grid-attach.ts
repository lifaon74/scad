import { ILines } from '../../misc/lines/lines.type.ts';
import { union } from '../../open-scad/modeling/union.ts';
import { cube } from '../../open-scad/primitives/3d/cube.ts';
import { cylinder } from '../../open-scad/primitives/3d/cylinder.ts';
import { translate } from '../../open-scad/transformations/translate.ts';
import { difference } from '../../open-scad/modeling/difference.ts';

export interface IAluminiumExtrusionGridAttachOptions {
  holesSpacing: number;
  holesRadius: number;
  xLength: number;
  yLength: number;
  zLength: number;
}

export function aluminiumExtrusionGridAttach(
  {
    holesSpacing,
    holesRadius,
    xLength,
    yLength,
    zLength,

  }: IAluminiumExtrusionGridAttachOptions,
): ILines {
  const extra: number = 1;
  return difference([
    cube({
      size: [xLength, yLength, zLength],
      center: true,
    }),
    union([
      translate([holesSpacing / 2, 0, 0], [
        cylinder({
          height: zLength + extra,
          radius: holesRadius,
          center: true,
        }),
      ]),
      translate([-holesSpacing / 2, 0, 0], [
        cylinder({
          height: zLength + extra,
          radius: holesRadius,
          center: true,
        }),
      ]),
    ]),
  ]);
}
