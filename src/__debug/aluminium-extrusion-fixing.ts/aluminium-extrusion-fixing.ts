import { ILines } from '../../misc/lines/lines.type.ts';
import { difference } from '../../open-scad/modeling/difference.ts';
import { union } from '../../open-scad/modeling/union.ts';
import { debug, none } from '../../open-scad/modifiers/modifier.ts';
import { repeat } from '../../open-scad/others/repeat.ts';
import { polygon } from '../../open-scad/primitives/2d/polygon.ts';
import { cube } from '../../open-scad/primitives/3d/cube.ts';
import { cylinder } from '../../open-scad/primitives/3d/cylinder.ts';
import { polyhedron } from '../../open-scad/primitives/3d/polyhedron.ts';
import { linearExtrude } from '../../open-scad/transformations/linear-extrude.ts';
import { rotate } from '../../open-scad/transformations/rotate.ts';
import { translate } from '../../open-scad/transformations/translate.ts';

export interface IAluminiumExtrusionRightAngleFixingPlateOptions {
  extrusionSide: number;
  extrusionCoverLength: number;
  extrusionCoverThickness: number;
  reinforcementLength: number;
}

export function aluminiumExtrusionRightAngleFixingPlate(
  {
    extrusionSide,
    extrusionCoverLength,
    extrusionCoverThickness,
    reinforcementLength,
  }: IAluminiumExtrusionRightAngleFixingPlateOptions,
): ILines {
  const a: number = extrusionCoverThickness + (extrusionSide * 0.5);
  const b: number = a + extrusionCoverLength;
  const c: number = a + reinforcementLength;

  return polygon({
    points: [
      -a, -a,
      b, -a,
      b, a,
      c, a,

      a, c,
      a, b,
      -a, b,
    ],
  });
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlock2DPlentyOptions extends IAluminiumExtrusionRightAngleFixingPlateOptions {

}

export function aluminiumExtrusionRightAngleFixingBlock2DPlenty(
  {
    extrusionCoverThickness,
    extrusionSide,
    ...options
  }: IAluminiumExtrusionRightAngleFixingBlock2DPlentyOptions,
): ILines {
  const height: number = (extrusionCoverThickness * 2) + extrusionSide;
  return linearExtrude({
    height,
    center: true,
  }, [
    aluminiumExtrusionRightAngleFixingPlate({
      ...options,
      extrusionCoverThickness,
      extrusionSide,
    }),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingPlateExtraReinforcementRemoveOptions {
  extrusionSide: number;
  extrusionCoverThickness: number;
  reinforcementLength: number;
  extraReinforcementLength: number;
}

export function aluminiumExtrusionRightAngleFixingPlateExtraReinforcementRemove(
  {
    extrusionSide,
    extrusionCoverThickness,
    reinforcementLength,
    extraReinforcementLength,
  }: IAluminiumExtrusionRightAngleFixingPlateExtraReinforcementRemoveOptions,
): ILines {
  const a: number = extrusionCoverThickness + (extrusionSide * 0.5);
  const b: number = a + extraReinforcementLength;
  const c: number = a + reinforcementLength + 1;

  return polygon({
    points: [
      b, a,
      c, a,

      a, c,
      a, b,
    ],
  });
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlock2DExtraReinforcementRemoveOptions extends IAluminiumExtrusionRightAngleFixingPlateExtraReinforcementRemoveOptions {

}

export function aluminiumExtrusionRightAngleFixingBlock2DExtraReinforcementRemove(
  {
    extrusionSide,
    ...options
  }: IAluminiumExtrusionRightAngleFixingBlock2DExtraReinforcementRemoveOptions,
): ILines {
  return linearExtrude({
    height: extrusionSide,
    center: true,
  }, [
    aluminiumExtrusionRightAngleFixingPlateExtraReinforcementRemove({
      ...options,
      extrusionSide,
    }),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlock3DExtraReinforcementAngleBlockOptions {
  extrusionSide: number;
  extrusionCoverThickness: number;
  extraReinforcementLength: number;
}

export function aluminiumExtrusionRightAngleFixingBlock3DExtraReinforcementAngleBlock(
  {
    extrusionSide,
    extrusionCoverThickness,
    extraReinforcementLength,
  }: IAluminiumExtrusionRightAngleFixingBlock3DExtraReinforcementAngleBlockOptions,
): ILines {
  const c: number = (extrusionCoverThickness + (extrusionSide * 0.5));
  const a: number = c - 1;
  const b: number = c + extraReinforcementLength;

  return polyhedron({
    points: [
      a, a, a,
      b, a, a,
      a, b, a,
      a, a, b,
    ],
    faces: [
      [0, 1, 2], // xy plane
      [0, 3, 1], // xz plane
      [0, 2, 3], // yz plane
      [1, 3, 2],
    ],
  });
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlock3DRemoveCornerOptions {
  extrusionSide: number;
  extrusionCoverThickness: number;
  removeAngleCornerSize: number;
}

export function aluminiumExtrusionRightAngleFixingBlock3DRemoveCorner(
  {
    extrusionSide,
    extrusionCoverThickness,
    removeAngleCornerSize,
  }: IAluminiumExtrusionRightAngleFixingBlock3DRemoveCornerOptions,
): ILines {
  const c: number = extrusionCoverThickness + (extrusionSide * 0.5);
  const a: number = -1 - c;
  const b: number = removeAngleCornerSize - c;

  return polyhedron({
    points: [
      a, a, a,
      b, a, a,
      a, b, a,
      a, a, b,
    ],
    faces: [
      [0, 1, 2], // xy plane
      [0, 3, 1], // xz plane
      [0, 2, 3], // yz plane
      [1, 3, 2],
    ],
  });
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlock2DExtraReinforcementWithAttachHoleRemoveOptions extends IAluminiumExtrusionRightAngleFixingPlateExtraReinforcementRemoveOptions {
  extraReinforcementAttachHoleOffset: number;
  extraReinforcementAttachHoleRadius: number;
}

export function aluminiumExtrusionRightAngleFixingBlock2DExtraReinforcementWithAttachHoleRemove(
  {
    extrusionSide,
    extrusionCoverThickness,
    extraReinforcementAttachHoleOffset,
    extraReinforcementAttachHoleRadius,
    ...options
  }: IAluminiumExtrusionRightAngleFixingBlock2DExtraReinforcementWithAttachHoleRemoveOptions,
): ILines {
  const extraReinforcementAttachHoleHeight: number = (extrusionCoverThickness * 2) + extrusionSide + 1;
  const a: number = extrusionCoverThickness + (extrusionSide * 0.5) + extraReinforcementAttachHoleOffset;

  return union([
    aluminiumExtrusionRightAngleFixingBlock2DExtraReinforcementRemove({
      ...options,
      extrusionSide,
      extrusionCoverThickness,
    }),
    translate([a, a, 0], [
      cylinder({
        radius: extraReinforcementAttachHoleRadius,
        height: extraReinforcementAttachHoleHeight,
        center: true,
      }),
    ]),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlock2DExtrusionRemove {
  extrusionSide: number;
  extrusionCoverLength: number;
  extrusionCoverThickness: number;
  extrusionAttachHoleRadius: number;
  extrusionAttachHoleOffset: number;
}

export function aluminiumExtrusionRightAngleFixingBlock2DExtrusionRemove(
  {
    extrusionSide,
    extrusionCoverLength,
    extrusionCoverThickness,
    extrusionAttachHoleRadius,
    extrusionAttachHoleOffset,
  }: IAluminiumExtrusionRightAngleFixingBlock2DExtrusionRemove,
): ILines {
  const a: number = (extrusionSide * 0.5);
  const b: number = extrusionCoverThickness + a;
  const c: number = b + extrusionAttachHoleOffset;
  const d: number = b +  extrusionCoverLength - extrusionAttachHoleOffset;

  const screwHole = (): ILines => {
    const offset: number = (extrusionCoverThickness * 0.5) + (extrusionSide * 0.5);
    const screwHoleHeight: number = offset * 1.5;
    // const screwHoleHeight: number = ((extrusionCoverThickness * 2) + extrusionSide) * 2;

    return translate([0, -offset, 0], [
      rotate([90, 0, 0], [
        cylinder({
          radius: extrusionAttachHoleRadius,
          height: screwHoleHeight,
          center: true,
        }),
      ]),
    ]);
  };

  const screwHolesAround = (): ILines => {
    return repeat(4, (index: number): ILines => {
      return rotate([90 * index, 0, 0], [
        screwHole(),
      ]);
    });
  };

  return union([
    translate([b, -a, -a], [
      cube({
        size: [extrusionCoverLength * 2, extrusionSide, extrusionSide],
      }),
    ]),
    translate([c, 0, 0], [
      screwHolesAround(),
    ]),
    translate([d, 0, 0], [
      screwHolesAround(),
    ]),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlock2DCenterExtrusionRemove {
  extrusionSide: number;
  extrusionCoverThickness: number;
  extrusionAttachHoleRadius: number;
}

export function aluminiumExtrusionRightAngleFixingBlock2DCenterExtrusionRemove(
  {
    extrusionSide,
    extrusionCoverThickness,
    extrusionAttachHoleRadius,
  }: IAluminiumExtrusionRightAngleFixingBlock2DCenterExtrusionRemove,
): ILines {
  const extrusionHeight: number = ((extrusionCoverThickness * 2) + extrusionSide) * 4;

  const screwHole = (): ILines => {
    const offset: number = (extrusionCoverThickness * 0.5) + (extrusionSide * 0.5);
    const screwHoleHeight: number = offset * 2;

    return translate([0, -offset, 0], [
      rotate([90, 0, 0], [
        cylinder({
          radius: extrusionAttachHoleRadius,
          height: screwHoleHeight,
          center: true,
        }),
      ]),
    ]);
  };

  return union([
    cube({
      size: [extrusionSide, extrusionSide, extrusionHeight],
      center: true,
    }),
    rotate([0, 0, 0], [
      screwHole(),
    ]),
    rotate([0, 0, -90], [
      screwHole(),
    ]),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlock2DOptions extends //
  IAluminiumExtrusionRightAngleFixingPlateOptions,
  IAluminiumExtrusionRightAngleFixingBlock2DExtrusionRemove,
  IAluminiumExtrusionRightAngleFixingPlateExtraReinforcementRemoveOptions,
  IAluminiumExtrusionRightAngleFixingBlock2DExtraReinforcementWithAttachHoleRemoveOptions,
  IAluminiumExtrusionRightAngleFixingBlock2DCenterExtrusionRemove
//
{

}

export function aluminiumExtrusionRightAngleFixingBlock2D(
  {
    ...options
  }: IAluminiumExtrusionRightAngleFixingBlock2DOptions,
): ILines {
  return difference([
    aluminiumExtrusionRightAngleFixingBlock2DPlenty(options),
    debug(
      union([
        // extrusion remove
        union([
          rotate([0, 0, 0], [ // x
            aluminiumExtrusionRightAngleFixingBlock2DExtrusionRemove(options),
          ]),
          rotate([0, 0, 90], [ // y
            aluminiumExtrusionRightAngleFixingBlock2DExtrusionRemove(options),
          ]),
          aluminiumExtrusionRightAngleFixingBlock2DCenterExtrusionRemove(options), // z
        ]),
        // extra reinforcement
        aluminiumExtrusionRightAngleFixingBlock2DExtraReinforcementWithAttachHoleRemove(options),
      ]),
    ),
  ]);
}

/*---*/

export interface IAluminiumExtrusionRightAngleFixingBlock3DOptions extends //
  IAluminiumExtrusionRightAngleFixingPlateOptions,
  IAluminiumExtrusionRightAngleFixingBlock2DExtrusionRemove,
  IAluminiumExtrusionRightAngleFixingPlateExtraReinforcementRemoveOptions,
  IAluminiumExtrusionRightAngleFixingBlock2DExtraReinforcementWithAttachHoleRemoveOptions,
  IAluminiumExtrusionRightAngleFixingBlock3DRemoveCornerOptions
//
{

}

export function aluminiumExtrusionRightAngleFixingBlock3D(
  {
    ...options
  }: IAluminiumExtrusionRightAngleFixingBlock3DOptions,
): ILines {
  return difference([
    union([
      rotate([0, 0, 0], [ // xy plan
        aluminiumExtrusionRightAngleFixingBlock2DPlenty(options),
      ]),
      rotate([90, 0, 0], [ // xz plan
        aluminiumExtrusionRightAngleFixingBlock2DPlenty(options),
      ]),
      rotate([0, -90, 0], [ // yz plan
        aluminiumExtrusionRightAngleFixingBlock2DPlenty(options),
      ]),
      aluminiumExtrusionRightAngleFixingBlock3DExtraReinforcementAngleBlock(options),
    ]),
    none(
      union([
        // extrusion remove
        union([
          rotate([0, 0, 0], [ // x
            aluminiumExtrusionRightAngleFixingBlock2DExtrusionRemove(options),
          ]),
          rotate([0, 0, 90], [ // y
            aluminiumExtrusionRightAngleFixingBlock2DExtrusionRemove(options),
          ]),
          rotate([0, -90, 0], [ // z
            aluminiumExtrusionRightAngleFixingBlock2DExtrusionRemove(options),
          ]),
        ]),
        // extra reinforcement
        union([
          rotate([0, 0, 0], [ // xy plan
            aluminiumExtrusionRightAngleFixingBlock2DExtraReinforcementWithAttachHoleRemove(options),
          ]),
          rotate([90, 0, 0], [ // xz plan
            aluminiumExtrusionRightAngleFixingBlock2DExtraReinforcementWithAttachHoleRemove(options),
          ]),
          rotate([0, -90, 0], [ // yz plan
            aluminiumExtrusionRightAngleFixingBlock2DExtraReinforcementWithAttachHoleRemove(options),
          ]),
        ]),
        //corder
        aluminiumExtrusionRightAngleFixingBlock3DRemoveCorner(options),
      ]),
    ),
  ]);
}
