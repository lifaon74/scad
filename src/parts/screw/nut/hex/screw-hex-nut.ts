import { cos } from '../../../../open-scad/math/cos.ts';
import { Lines } from '../../../../misc/lines/lines.ts';
import { difference } from '../../../../open-scad/modeling/difference.ts';
import { cylinder, CylinderOptions } from '../../../../open-scad/build/primitives/3d/cylinder.ts';
import { screwBody } from '../../body/screw-body.ts';
import { IScrewWasherExternalOptions } from '../../washer/screw-washer.ts';

export function getRealScrewHexNutRadius(
  radius: number,
): number {
  return radius / cos(30);
}

export interface IScrewNutExternalOptions extends Pick<CylinderOptions, 'height' | 'radius'> {

}

export function screwHexNutExternal(
  {
    radius,
    ...options
  }: IScrewWasherExternalOptions,
): Lines {
  return cylinder({
    ...options,
    radius: getRealScrewHexNutRadius(radius),
    fragmentNumber: 6,
    center: true,
  });
}

export interface IScrewHeyNutOptions extends Pick<IScrewNutExternalOptions, 'height'> {
  externalRadius: number;
  internalRadius: number;
}

export function screwHexNut(
  {
    externalRadius,
    internalRadius,
    ...options
  }: IScrewHeyNutOptions,
): Lines {
  return difference([
    screwHexNutExternal({
      ...options,
      radius: externalRadius,
    }),
    screwBody({
      ...options,
      radius: internalRadius,
    }),
  ]);
}
