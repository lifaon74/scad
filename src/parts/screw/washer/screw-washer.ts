import { ILines } from '../../../misc/lines/lines.type.ts';
import { difference } from '../../../open-scad/modeling/difference.ts';
import { cylinder, ICylinderOptions } from '../../../open-scad/primitives/3d/cylinder.ts';
import { screwBody } from '../body/screw-body.ts';

export interface IScrewWasherExternalOptions extends Pick<ICylinderOptions, 'height' | 'radius'>{

}

export function screwWasherExternal(
  options: IScrewWasherExternalOptions,
): ILines {
  return cylinder({
    ...options,
    center: true,
  });
}


export interface IScrewWasherOptions extends Pick<IScrewWasherExternalOptions, 'height'>{
  externalRadius: number;
  internalRadius: number;
}

export function screwWasher(
  {
    externalRadius,
    internalRadius,
    ...options
  }: IScrewWasherOptions,
): ILines {
  return difference([
    screwWasherExternal({
      ...options,
      radius: externalRadius,
    }),
    screwBody({
      ...options,
      radius: internalRadius,
    }),
  ]);
}
