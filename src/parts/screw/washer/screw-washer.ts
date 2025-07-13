import { Lines } from '../../../misc/lines/lines.ts';
import { difference } from '../../../open-scad/modeling/difference.ts';
import { cylinder, CylinderOptions } from '../../../open-scad/build/primitives/3d/cylinder.ts';
import { screwBody } from '../body/screw-body.ts';

export interface IScrewWasherExternalOptions extends Pick<CylinderOptions, 'height' | 'radius'>{

}

export function screwWasherExternal(
  options: IScrewWasherExternalOptions,
): Lines {
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
): Lines {
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
