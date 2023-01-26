import { diameter } from '../../../open-scad/math/units/diameter-to-radius.ts';
import { IScrewBodyOptions } from './screw-body.ts';

export type IPartialScrewBodyOptions = Pick<IScrewBodyOptions, 'radius'>;

export const SCREW_M3: IPartialScrewBodyOptions = {
  radius: diameter(3),
};

export const SCREW_M4: IPartialScrewBodyOptions = {
  radius: diameter(4),
};

