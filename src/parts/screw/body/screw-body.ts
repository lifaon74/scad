import { Lines } from '../../../misc/lines/lines.ts';
import { cylinder, CylinderOptions } from '../../../open-scad/build/primitives/3d/cylinder.ts';

export interface IScrewBodyOptions extends Pick<CylinderOptions, 'height' | 'radius'>{

}

export function screwBody(
  options: IScrewBodyOptions,
): Lines {
  return cylinder({
    ...options,
    fragmentNumber: 30,
    center: true,
  });
}
