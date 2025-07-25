import { Lines } from '../../misc/lines/lines.ts';
import { repeat } from '../../open-scad/build/others/repeat.ts';
import { polygon } from '../../open-scad/build/primitives/2d/polygon.ts';
import { cylinder } from '../../open-scad/build/primitives/3d/cylinder.ts';
import { linearExtrude } from '../../open-scad/build/transformations/linear-extrude.ts';
import { rotate } from '../../open-scad/build/transformations/rotate.ts';
import { translate } from '../../open-scad/build/transformations/translate.ts';
import { union } from '../../open-scad/build/modeling/union.ts';
import { MICRO_OFFSET } from '../../open-scad/build/math/micro-offset.ts';
import { modifier } from '../../open-scad/build/modifiers/modifier.ts';
import { difference } from '../../open-scad/build/modeling/difference.ts';

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
): Lines {
  return linearExtrude({
    height: extrusionSide,
    center: true,
  }, [
    polygon({
      points: [
        0,
        0,
        extrusionCoverLength,
        0,
        0,
        extrusionCoverLength,
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
): Lines {
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

export interface IAluminiumExtrusionRightAngleFixingScrewsRemoveOptions extends
  //
  IAluminiumExtrusionRightAngleFixingScrewRemoveOptions//
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
): Lines {
  return modifier(
    "debug",
    union([
      repeat(screwsCount, (index: number) =>
        union([
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

export interface IAluminiumExtrusionRightAngleFixingOptions extends
  //
  IAluminiumExtrusionRightAngleFixingInitialBlockOptions,
  IAluminiumExtrusionRightAngleFixingScrewsRemoveOptions//
{
}

export function aluminiumExtrusionRightAngleFixing(
  options: IAluminiumExtrusionRightAngleFixingOptions,
): Lines {
  return difference([
    aluminiumExtrusionRightAngleFixingInitialBlock(options),
    aluminiumExtrusionRightAngleFixingScrewsRemove(options),
  ]);
}
