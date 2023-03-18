import { ILines } from '../../misc/lines/lines.type.ts';
import { offset3d } from './offset-3d.ts';

// https://github.com/nophead/NopSCADlib/blob/master/utils/round.scad

export interface IRound3dOptions {
  radius?: number;
  radiusInner?: number;
  radiusOuter?: number;
  chamferBase?: boolean;
}

export function round3d(
  {
    radius,
    radiusInner = radius,
    radiusOuter = radius,
    chamferBase = false,
  }: IRound3dOptions,
  expressions: ILines[],
): ILines {

  return offset3d({ radius: radiusOuter, chamferBase }, [
    offset3d({ radius: (-radiusOuter! - radiusInner!), chamferBase }, [
      offset3d({ radius: radiusInner, chamferBase }, expressions),
    ]),
  ]);
  /*
  module round_3D(r, ir = undef, or = undef, chamfer_base = false) { //! Round a 3D child single radius or separate inside and outside radii
    IR = is_undef(ir) ? r : ir;
    OR = is_undef(or) ? r : or;
    offset_3D(OR, chamfer_base)
        offset_3D(-OR -IR, chamfer_base)
            offset_3D(IR, chamfer_base)
                children();
}
   */
}
