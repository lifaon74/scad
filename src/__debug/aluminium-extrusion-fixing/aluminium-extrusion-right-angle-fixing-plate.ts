import { ILines } from '../../misc/lines/lines.type.ts';
import { MICRO_OFFSET } from '../../open-scad/math/micro-offset.ts';
import { difference } from '../../open-scad/modeling/difference.ts';
import { union } from '../../open-scad/modeling/union.ts';
import { modifier } from '../../open-scad/modifiers/modifier.ts';
import { repeat } from '../../open-scad/others/repeat.ts';
import { polygon } from '../../open-scad/primitives/2d/polygon.ts';
import { cylinder } from '../../open-scad/primitives/3d/cylinder.ts';
import { linearExtrude } from '../../open-scad/transformations/linear-extrude.ts';
import { rotate } from '../../open-scad/transformations/rotate.ts';
import { translate } from '../../open-scad/transformations/translate.ts';

/*-------------------------------------*/

export interface IAluminiumExtrusionRightAngleFixingPlateInitialBlockOptions {
  readonly extrusionSide: number;
  readonly extrusionCoverLength: number;
  readonly extrusionCoverThickness: number;
}

export function aluminiumExtrusionRightAngleFixingPlateInitialBlock(
  {
    extrusionSide,
    extrusionCoverLength,
    extrusionCoverThickness,
  }: IAluminiumExtrusionRightAngleFixingPlateInitialBlockOptions,
): ILines {
  return linearExtrude({
    height: extrusionCoverThickness,
    center: true,
  }, [
    polygon({
      points: [
        -extrusionSide, -extrusionSide,
        extrusionCoverLength, -extrusionSide,
        extrusionCoverLength, 0,
        0, extrusionCoverLength,
        -extrusionSide, extrusionCoverLength,
      ],
    }),
  ]);
}

export interface IAluminiumExtrusionRightAngleFixingPlateScrewRemoveOptions {
  readonly screwBodyRadius: number;
  readonly screwBodyLength: number;

}

export function aluminiumExtrusionRightAngleFixingPlateScrewRemove(
  {
    screwBodyRadius,
    screwBodyLength,
  }: IAluminiumExtrusionRightAngleFixingPlateScrewRemoveOptions,
): ILines {
  return cylinder({
    radius: screwBodyRadius,
    height: screwBodyLength,
    center: true,
  });
}

export interface IAluminiumExtrusionRightAngleFixingPlateScrewsRemoveOptions extends //
  IAluminiumExtrusionRightAngleFixingPlateScrewRemoveOptions
//
{
  readonly extrusionSide: number;
  readonly screwsSpacing: number;
  readonly screwsCount: number;
}

export function aluminiumExtrusionRightAngleFixingPlateScrewsRemove(
  {
    extrusionSide,
    screwsSpacing,
    screwsCount,
    ...options
  }: IAluminiumExtrusionRightAngleFixingPlateScrewsRemoveOptions,
): ILines {
  const screwOffsetX: number = -extrusionSide * 0.5;
  const screwOffsetY: number = -extrusionSide * 0.5;

  return modifier('debug',
    union([
      repeat(screwsCount, (index: number) => union([
        translate([screwOffsetX + index * screwsSpacing, screwOffsetY, 0], [
          aluminiumExtrusionRightAngleFixingPlateScrewRemove(options),
        ]),
        translate([screwOffsetY, screwOffsetX + index * screwsSpacing, 0], [
          rotate([0, 0, -90], [
            aluminiumExtrusionRightAngleFixingPlateScrewRemove(options),
          ]),
        ]),
      ])),
    ]),
  );
}

/*----*/

export interface IAluminiumExtrusionRightAngleFixingPlateOptions extends //
  IAluminiumExtrusionRightAngleFixingPlateInitialBlockOptions,
  IAluminiumExtrusionRightAngleFixingPlateScrewsRemoveOptions
//
{
}

export function aluminiumExtrusionRightAngleFixingPlate(
  options: IAluminiumExtrusionRightAngleFixingPlateOptions,
): ILines {
  return difference([
    aluminiumExtrusionRightAngleFixingPlateInitialBlock(options),
    aluminiumExtrusionRightAngleFixingPlateScrewsRemove(options),
  ]);
}

