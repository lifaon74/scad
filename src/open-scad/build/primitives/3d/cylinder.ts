import { Lines } from '../../../../misc/lines/lines.ts';
import { cone, ConeOptions } from './cone.ts';

export interface CylinderOptions extends Omit<ConeOptions, 'radiusBottom' | 'radiusTop'> {
  readonly height: number;
  readonly radius: number;
}

/**
 * Creates a cylinder.
 *
 * @inheritDoc https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Primitive_Solids#cylinder
 */
export function cylinder(
  {
    radius,
    ...options
  }: CylinderOptions,
): Lines {
  return cone({
    ...options,
    radiusTop: radius,
    radiusBottom: radius,
  });
}
