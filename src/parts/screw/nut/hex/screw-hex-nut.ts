import { cos } from '../../../../open-scad/math/cos.ts';
import { ILines } from '../../../../misc/lines/lines.type.ts';
import { difference } from '../../../../open-scad/modeling/difference.ts';
import { cylinder, ICylinderOptions } from '../../../../open-scad/primitives/3d/cylinder.ts';
import { screwBody } from '../../body/screw-body.ts';
import { IScrewWasherExternalOptions } from '../../washer/screw-washer.ts';

export function getRealScrewHexNutRadius(
  radius: number,
): number {
  return radius / cos(30);
}

export interface IScrewNutExternalOptions extends Pick<ICylinderOptions, 'height' | 'radius'> {

}

export function screwHexNutExternal(
  {
    radius,
    ...options
  }: IScrewWasherExternalOptions,
): ILines {
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
): ILines {
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
