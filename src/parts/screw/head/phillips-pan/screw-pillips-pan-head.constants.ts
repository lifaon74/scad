import { diameter } from '../../../../open-scad/math/units/diameter-to-radius.ts';
import { IScrewPhillipsPanHeadOptions } from './screw-phillips-pan-head.ts';

export const PHILLIPS_PAN_HEAD_M3: IScrewPhillipsPanHeadOptions = {
  radius: diameter(5.2),
  height: 1.7,
};

export const PHILLIPS_PAN_HEAD_M4: IScrewPhillipsPanHeadOptions = {
  radius: diameter(6.6),
  height: 2.2,
};
