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

export interface IAluminiumExtrusionRightAngleFixingInitialBlockOptions {
  readonly extrusionSide: number;
  readonly extrusionCoverLength: number;
}

export function aluminiumExtrusionRightAngleFixingInitialBlock(
  {
    extrusionSide,
    extrusionCoverLength,
  }: IAluminiumExtrusionRightAngleFixingInitialBlockOptions,
): ILines {
  return linearExtrude({
    height: extrusionSide,
    center: true,
  }, [
    polygon({
      points: [
        0, 0,
        extrusionCoverLength, 0,
        0, extrusionCoverLength,
      ],
    }),
  ]);
}

export interface IAluminiumExtrusionRightAngleFixingScrewRemoveOptions {
  readonly screwBodyRadius: number;
  readonly screwBodyLength: number;
  readonly screwHeadRadius: number;
  readonly screwHeadLength: number;

}

export function aluminiumExtrusionRightAngleFixingScrewRemove(
  {
    screwBodyRadius,
    screwBodyLength,
    screwHeadRadius,
    screwHeadLength,
  }: IAluminiumExtrusionRightAngleFixingScrewRemoveOptions,
): ILines {
  return rotate([-90, 0, 0], [
    union([
      cylinder({
        radius: screwHeadRadius,
        height: screwHeadLength,
      }),
      translate([0, 0, -screwBodyLength + MICRO_OFFSET], [
        cylinder({
          radius: screwBodyRadius,
          height: screwBodyLength,
        }),
      ]),
    ]),
  ]);
}

export interface IAluminiumExtrusionRightAngleFixingScrewsRemoveOptions extends //
  IAluminiumExtrusionRightAngleFixingScrewRemoveOptions
//
{
  readonly screwOffsetX: number;
  readonly screwOffsetY: number;
  readonly screwsSpacing: number;
  readonly screwsCount: number;
}

export function aluminiumExtrusionRightAngleFixingScrewsRemove(
  {
    screwOffsetX,
    screwOffsetY,
    screwsSpacing,
    screwsCount,
    ...options
  }: IAluminiumExtrusionRightAngleFixingScrewsRemoveOptions,
): ILines {
  return modifier('debug',
    union([
      repeat(screwsCount, (index: number) => union([
        translate([screwOffsetX + index * screwsSpacing, screwOffsetY, 0], [
          aluminiumExtrusionRightAngleFixingScrewRemove(options),
        ]),
        translate([screwOffsetY, screwOffsetX + index * screwsSpacing, 0], [
          rotate([0, 0, -90], [
            aluminiumExtrusionRightAngleFixingScrewRemove(options),
          ]),
        ]),
      ])),
    ]),
  );
}

/*----*/

export interface IAluminiumExtrusionRightAngleFixingOptions extends //
  IAluminiumExtrusionRightAngleFixingInitialBlockOptions,
  IAluminiumExtrusionRightAngleFixingScrewsRemoveOptions
//
{
}

export function aluminiumExtrusionRightAngleFixing(
  options: IAluminiumExtrusionRightAngleFixingOptions,
): ILines {
  return difference([
    aluminiumExtrusionRightAngleFixingInitialBlock(options),
    aluminiumExtrusionRightAngleFixingScrewsRemove(options),
  ]);
}

