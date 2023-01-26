import { ILines } from '../../../../misc/lines/lines.type.ts';
import { MICRO_OFFSET } from '../../../../open-scad/math/micro-offset.ts';
import { difference } from '../../../../open-scad/modeling/difference.ts';
import { modifier } from '../../../../open-scad/modifiers/modifier.ts';
import { polygon } from '../../../../open-scad/primitives/2d/polygon.ts';
import { cylinder, ICylinderOptions } from '../../../../open-scad/primitives/3d/cylinder.ts';
import { linearExtrude } from '../../../../open-scad/transformations/linear-extrude.ts';
import { rotate } from '../../../../open-scad/transformations/rotate.ts';
import { translate } from '../../../../open-scad/transformations/translate.ts';

export interface IScrewPhillipsPanHeadOptions extends Pick<ICylinderOptions, 'height' | 'radius'> {

}

export function screwPhillipsPanHead(
  options: IScrewPhillipsPanHeadOptions,
): ILines {
  const x: number = options.radius * 0.7;
  const y: number = options.radius * 0.2;
  const z: number = options.height * 0.8;

  const createHole = (): ILines => {
    return linearExtrude({
      height: y,
      center: true,
    }, [
      polygon({
        points: [
          -x, 0,
          +x, 0,
          0, z,
        ],
      }),
    ]);
  };

  return difference([
    cylinder({
      ...options,
      fragmentNumber: 30,
      center: true,
    }),
    modifier(
      'none',
      translate([0, 0, (options.height * 0.5) + MICRO_OFFSET], [
        rotate([-90, 0, 0], [
          createHole(),
        ]),
        rotate([-90, 0, -90], [
          createHole(),
        ]),
      ]),
    ),
  ]);
}
