import { diameter } from '../../../../open-scad/math/units/diameter-to-radius.ts';
import { IScrewNutExternalOptions } from './screw-hex-nut.ts';

// https://www.engineersedge.com/hardware/standard_metric_hex_nuts_13728.htm
// https://www.engineersedge.com/hardware/metric_hex_nuts_14056.htm

export const HEX_NUT_M1_6: IScrewNutExternalOptions = {
  radius: diameter(3.2),
  height: 1.3,
};

export const HEX_NUT_M2: IScrewNutExternalOptions = {
  radius: diameter(4),
  height: 1.6,
};

export const HEX_NUT_M2_5: IScrewNutExternalOptions = {
  radius: diameter(5),
  height: 2.0,
};

export const HEX_NUT_M3: IScrewNutExternalOptions = {
  radius: diameter(5.5),
  height: 2.4,
};

export const HEX_NUT_M3_SELF_LOCK: IScrewNutExternalOptions = {
  ...HEX_NUT_M3,
  height: 4.0,
};

export const HEX_NUT_M4: IScrewNutExternalOptions = {
  radius: diameter(7.0),
  height: 3.2,
};

export const HEX_NUT_M5: IScrewNutExternalOptions = {
  radius: diameter(8.0),
  height: 4.7,
};

export const HEX_NUT_M6: IScrewNutExternalOptions = {
  radius: diameter(10.0),
  height: 5.2,
};

export const HEX_NUT_M8: IScrewNutExternalOptions = {
  radius: diameter(13.0),
  height: 6.8,
};

export const HEX_NUT_M10: IScrewNutExternalOptions = {
  radius: diameter(16.0),
  height: 9.1,
};

export const HEX_NUT_M12: IScrewNutExternalOptions = {
  radius: diameter(18.0),
  height: 10.8,
};

