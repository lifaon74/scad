import { diameter } from '../../../open-scad/math/units/diameter-to-radius.ts';
import { IScrewWasherExternalOptions } from './screw-washer.ts';

export const WASHER_M3: IScrewWasherExternalOptions = {
  radius: diameter(7.0),
  height: 0.5,
};
