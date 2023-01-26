import { ILines } from '../misc/lines/lines.type.ts';
import { ALUMINIUM } from '../open-scad/color/colors.constants.ts';
import { exportToSCAD } from '../open-scad/export/export-to-scad.ts';
import { deg } from '../open-scad/math/units/angle/deg-to-rad.ts';
import { diameter } from '../open-scad/math/units/diameter-to-radius.ts';
import { union } from '../open-scad/modeling/union.ts';
import { bom } from '../open-scad/others/bom.ts';
import { $fn } from '../open-scad/others/fn.ts';
import { group } from '../open-scad/others/group.ts';
import { circle } from '../open-scad/primitives/2d/circle.ts';
import { cube } from '../open-scad/primitives/3d/cube.ts';
import { sphere } from '../open-scad/primitives/3d/sphere.ts';
import { color } from '../open-scad/transformations/color.ts';
import { linearExtrude } from '../open-scad/transformations/linear-extrude.ts';
import { translate } from '../open-scad/transformations/translate.ts';
import { PHILLIPS_PAN_M3, screwPhillipsPanAuto } from '../parts/screw/built-in/phillips-pan/screw-pillips-pan.constants.ts';
import { aluminiumExtrusionRightAngleFixingBlock3D } from './aluminium-extrusion-fixing.ts/aluminium-extrusion-fixing.ts';

const OUT_PATH = './dist/debug.scad';

/*---------*/

/*---------*/

export function screw1(): ILines {
  return [
    ...bom({
      title: 'Phillips pan m3 100mm',
    }),
    ...screwPhillipsPanAuto(PHILLIPS_PAN_M3, 100),
  ];
}

/*---------*/

export interface IAluminiumExtrusionOptions {
  side: number;
  length: number;
}

export function aluminiumExtrusion(
  {
    side,
    length,
  }: IAluminiumExtrusionOptions,
): ILines {
  return color(ALUMINIUM, [
    cube({
      size: [length, side, side],
      center: true,
    }),
  ]);
}

export function aluminiumExtrusion20mm(
  length: number,
): ILines {
  return aluminiumExtrusion({
    side: 20,
    length,
  });
}

/*--------------*/

function project01(): ILines {
  const config = {
    extrusionSide: 20.4,
    extrusionCoverLength: 40,
    extrusionCoverThickness: 3,
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
    aluminiumExtrusionRightAngleFixingBlock3D(config),
  ]);
}

/*--------------*/

function example01(): ILines {
  return color([1, 0, 0], [
    translate([8, 9, 0], [
      union([
        cube({ size: [1, 2, 30], center: true }),
        sphere({ radius: 10 }),
      ]),
    ]),
  ]);
}

function example02(): ILines {
  return union([
    linearExtrude({
      height: 10,
      twist: deg(360),
      fragmentNumber: 100,
    }, [
      translate([2, 0, 0], [
        circle({ radius: 1 }),
      ]),
      translate([-2, 0, 0], [
        circle({ radius: 1 }),
      ]),
    ]),
  ]);
}

/*--------------*/

export async function debugFunctionBased() {
  // const lines = example01();
  // const lines = example02();
  // const lines = aluminiumExtrusion20mm(cm(50));
  const lines = project01();

  await exportToSCAD(OUT_PATH, lines);
}
