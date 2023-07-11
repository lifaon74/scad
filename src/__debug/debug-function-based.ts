import { ILines } from '../misc/lines/lines.type.ts';
import { ALUMINIUM } from '../open-scad/color/colors.constants.ts';
import { exportToSCAD } from '../open-scad/export/export-to-scad.ts';
import { deg } from '../open-scad/math/units/angle/deg-to-rad.ts';
import { diameter } from '../open-scad/math/units/diameter-to-radius.ts';
import { difference } from '../open-scad/modeling/difference.ts';
import { union } from '../open-scad/modeling/union.ts';
import { background, debug, modifier, none } from '../open-scad/modifiers/modifier.ts';
import { bom } from '../open-scad/others/bom.ts';
import { $fn } from '../open-scad/others/fn.ts';
import { group } from '../open-scad/others/group.ts';
import { circle } from '../open-scad/primitives/2d/circle.ts';
import { cube } from '../open-scad/primitives/3d/cube.ts';
import { cylinder } from '../open-scad/primitives/3d/cylinder.ts';
import { sphere } from '../open-scad/primitives/3d/sphere.ts';
import { color } from '../open-scad/transformations/color.ts';
import { linearExtrude } from '../open-scad/transformations/linear-extrude.ts';
import { minkowski } from '../open-scad/transformations/minkowski.ts';
import { mirror } from '../open-scad/transformations/mirror.ts';
import { offset2d } from '../open-scad/transformations/offset-2d.ts';
import { offset3d } from '../open-scad/transformations/offset-3d.ts';
import { rotate } from '../open-scad/transformations/rotate.ts';
import { round3d } from '../open-scad/transformations/round-3d.ts';
import { translate } from '../open-scad/transformations/translate.ts';
import { IVector3d } from '../open-scad/types/vector-3d.type.ts';
import { SCREW_M3 } from '../parts/screw/body/screw-body.constants.ts';
import { PHILLIPS_PAN_M3, screwPhillipsPanAuto } from '../parts/screw/built-in/phillips-pan/screw-pillips-pan.constants.ts';
import { HEX_NUT_M3, HEX_NUT_M3_SELF_LOCK } from '../parts/screw/nut/hex/screw-hex-nut.constants.ts';
import {
  aluminiumExtrusionRightAngleFixingBlock2D, aluminiumExtrusionRightAngleFixingBlock2DPart1, aluminiumExtrusionRightAngleFixingBlock2DPart2,
  aluminiumExtrusionRightAngleFixingBlock3D,
} from './aluminium-extrusion-fixing/aluminium-extrusion-fixing.ts';
import { sofaTableFoot } from './sofa-table/sofa-table.ts';
import { spoolHolder, spoolHolderRoller, spoolHolderRollerPositioned } from './spool-holder/spool-holder.ts';

const OUT_PATH = './dist/debug.scad';

/*--------------*/

function project01(): ILines {
  const config = {
    extrusionSide: 20.4,
    extrusionCoverLength: 30,
    extrusionCoverThickness: 2,
    extrusionAttachHoleRadius: diameter(3),
    extrusionAttachHoleOffset: 10,
    reinforcementLength: 30,
    extraReinforcementLength: 10,
    extraReinforcementAttachHoleOffset: 10,
    extraReinforcementAttachHoleRadius: diameter(3),
    removeAngleCornerSize: 10,
  };

  return group([
    $fn(30),
    // aluminiumExtrusionRightAngleFixingBlock2D(config),
    // aluminiumExtrusionRightAngleFixingBlock2DPart1(config),
    // aluminiumExtrusionRightAngleFixingBlock2DPart2(config),
    aluminiumExtrusionRightAngleFixingBlock3D(config),
  ]);
}

function project02(): ILines {
  return group([
    $fn(30),
    sofaTableFoot({ footSize: [16, 10, 240] }),
  ]);
}

function project03(): ILines {
  const config = {
    rollerOuterRadius: diameter(16),
    rollerInnerRadius: diameter(14),
    rollerLength: 136,
    rollerScrewLength: 25,
    rollerScrewExtraLength: 5,
    rollerScrewRadius: SCREW_M3.radius,
    rollerScrewNutRadius: HEX_NUT_M3_SELF_LOCK.radius + 0.15,
    rollerScrewNutHeight: HEX_NUT_M3_SELF_LOCK.height + 1,
    rollerBaseBlockSpaceX: 0.5,
    rollerBaseBlockSpaceY: 2,
    rollerBaseBlockSpaceZ: 3,
    rollerDistanceY: 110,

    //
    bearingRadius: diameter(9) + 0.15,
    bearingHeight: 4.0 + 0.1,
    bearingScrewLength: 25,
    bearingScrewRadius: SCREW_M3.radius,
    bearingScrewHeadRadius: diameter(7),
    baseBlockExtraThicknessX: 2,
    baseBlockThicknessY: 4,
  };

  const computeMinSpoolRadius = (
    {
      rollerDistanceY,
      rollerInnerRadius,
      rollerBaseBlockSpaceZ,
    }: any,
  ): number => {
    const x: number = (rollerDistanceY * 0.5);
    const y: number = (rollerBaseBlockSpaceZ + (rollerInnerRadius * 2));
    return (x ** 2 + y ** 2) / (2 * y);
  };

  const minSpoolRadius: number = computeMinSpoolRadius(config);
  console.log('minSpoolDiameter', minSpoolRadius * 2);

  interface ISpool {
    diameter: number,
    width: number;
  }

  const spook_1kg: ISpool = {
    diameter: 200,
    width: 66,
  };

  const spook_2kg: ISpool = {
    diameter: 200,
    width: 130,
  };

  const spook_3kg: ISpool = {
    diameter: 250,
    width: 115,
  };

  const spool_limits: ISpool = {
    diameter: minSpoolRadius * 2,
    width: config.rollerLength - 2,
  };

  const spool: ISpool = spook_1kg;
  // const spool: ISpool = spook_2kg;
  // const spool: ISpool = spook_3kg;
  // const spool: ISpool = spool_limits;

  return group([
    $fn(30),
    spoolHolder(config),
    // spoolHolderRollerPositioned(config),
    // none(
    //   mirror([0, 1, 0], [
    //     spoolHolderRollerPositioned(config),
    //   ]),
    // ),
    background(
      translate([-(spool.width * 0.5), 0, diameter(spool.diameter) + 3], [
        rotate([0, 90, 0], [
          cylinder({
            radius: diameter(spool.diameter),
            height: spool.width,
            fragmentNumber: 256,
          }),
        ]),
      ]),
    ),
  ]);
}

/*--------------*/

export async function debugFunctionBased() {
  // const lines = project01();
  // const lines = project02();
  const lines = project03();

  await exportToSCAD(OUT_PATH, lines);
}
