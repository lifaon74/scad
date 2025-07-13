import { Lines } from '../../misc/lines/lines.ts';
import { MICRO_OFFSET } from '../../open-scad/math/micro-offset.ts';
import { difference } from '../../open-scad/modeling/difference.ts';
import { union } from '../../open-scad/modeling/union.ts';
import { modifier } from '../../open-scad/modifiers/modifier.ts';
import { repeat } from '../../open-scad/build/others/repeat.ts';
import { polygon } from '../../open-scad/build/primitives/2d/polygon.ts';
import { cylinder } from '../../open-scad/build/primitives/3d/cylinder.ts';
import { linearExtrude } from '../../open-scad/build/transformations/linear-extrude.ts';
import { rotate } from '../../open-scad/build/transformations/rotate.ts';
import { translate } from '../../open-scad/build/transformations/translate.ts';

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
): Lines {
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
): Lines {
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
): Lines {
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
): Lines {
  return difference([
    aluminiumExtrusionRightAngleFixingPlateInitialBlock(options),
    aluminiumExtrusionRightAngleFixingPlateScrewsRemove(options),
  ]);
}

