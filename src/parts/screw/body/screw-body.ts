import { ILines } from '../../../misc/lines/lines.type.ts';
import { cylinder, ICylinderOptions } from '../../../open-scad/primitives/3d/cylinder.ts';

export interface IScrewBodyOptions extends Pick<ICylinderOptions, 'height' | 'radius'>{

}

export function screwBody(
  options: IScrewBodyOptions,
): ILines {
  return cylinder({
    ...options,
    fragmentNumber: 30,
    center: true,
  });
}
