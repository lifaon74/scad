import { ILines } from '../../../misc/lines/lines.type.ts';
import { cone, IConeOptions } from './cone.ts';

// https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#cylinder

export interface ICylinderOptions extends Omit<IConeOptions, 'radiusBottom' | 'radiusTop'> {
  height: number;
  radius: number;
}

export function cylinder(
  {
    radius,
    ...options
  }: ICylinderOptions,
): ILines {
  return cone({
    ...options,
    radiusTop: radius,
    radiusBottom: radius,
  });
}
