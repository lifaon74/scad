import { ILines } from '../misc/lines/lines.type.ts';
import { ALUMINIUM } from '../open-scad/color/colors.constants.ts';
import { exportToSCAD } from '../open-scad/export/export-to-scad.ts';
import { deg } from '../open-scad/math/units/angle/deg-to-rad.ts';
import { diameter } from '../open-scad/math/units/diameter-to-radius.ts';
import { difference } from '../open-scad/modeling/difference.ts';
import { union } from '../open-scad/modeling/union.ts';
import { modifier } from '../open-scad/modifiers/modifier.ts';
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
import { offset2d } from '../open-scad/transformations/offset-2d.ts';
import { offset3d } from '../open-scad/transformations/offset-3d.ts';
import { rotate } from '../open-scad/transformations/rotate.ts';
import { round3d } from '../open-scad/transformations/round-3d.ts';
import { translate } from '../open-scad/transformations/translate.ts';
import { IVector3d } from '../open-scad/types/vector-3d.type.ts';
import { PHILLIPS_PAN_M3, screwPhillipsPanAuto } from '../parts/screw/built-in/phillips-pan/screw-pillips-pan.constants.ts';
import {
  aluminiumExtrusionRightAngleFixingBlock2D, aluminiumExtrusionRightAngleFixingBlock2DPart1, aluminiumExtrusionRightAngleFixingBlock2DPart2,
  aluminiumExtrusionRightAngleFixingBlock3D,
} from './aluminium-extrusion-fixing.ts/aluminium-extrusion-fixing.ts';

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

export interface ISofaTableFootOptions {
  footSize: IVector3d;
}

export function sofaTableFoot(
  {
    footSize,
  }: ISofaTableFootOptions,
): ILines {
  const height = footSize[2] - footSize[0];

  const roundEnd = () => {
    return rotate([90, 0, 0], [
      cylinder({
        radius: diameter(footSize[0]),
        height: footSize[1],
        center: true,
      }),
    ]);
  };

  return difference([
    union([
      $fn(8),
      round3d({ radius: 1 }, [
        roundEnd(),
        translate([0, 0, -(height / 2)], [
          cube({ size: [footSize[0], footSize[1], height], center: true }),
        ]),
      ]),
    ]),
    rotate([90, 0, 0], [
      cylinder({
        radius: diameter(3),
        height: 20,
        center: true,
      }),
    ]),
  ]);
}

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
    aluminiumExtrusionRightAngleFixingBlock2DPart1(config),
    // aluminiumExtrusionRightAngleFixingBlock2DPart2(config),
    // modifier('none',
    //   aluminiumExtrusionRightAngleFixingBlock3D(config),
    // ),
  ]);
}

function project02(): ILines {
  return group([
    $fn(30),
    // aluminiumExtrusionRightAngleFixingBlock2D(config),
    sofaTableFoot({ footSize: [16, 10, 240] }),
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
  // const lines = project02();

  await exportToSCAD(OUT_PATH, lines);
}
