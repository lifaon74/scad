import { ILines } from '../../misc/lines/lines.type.ts';
import { difference } from '../../open-scad/modeling/difference.ts';
import { union } from '../../open-scad/modeling/union.ts';
import { debug } from '../../open-scad/modifiers/modifier.ts';
import { repeat } from '../../open-scad/others/repeat.ts';
import { cube } from '../../open-scad/primitives/3d/cube.ts';
import { cylinder } from '../../open-scad/primitives/3d/cylinder.ts';
import { mirror } from '../../open-scad/transformations/mirror.ts';
import { rotate } from '../../open-scad/transformations/rotate.ts';
import { translate } from '../../open-scad/transformations/translate.ts';

/*---*/

/** INNER INSERT **/

export interface IAirVentPipeInnerInsertBlockOptions {
  pipeInnerRadius: number;
  pipeInnerInsertHeight: number;
  pipeInnerInsertThickness: number;
}

export function airVentPipeInnerInsertBlock(
  {
    pipeInnerRadius,
    pipeInnerInsertHeight,
    pipeInnerInsertThickness,
  }: IAirVentPipeInnerInsertBlockOptions,
): ILines {
  const extra: number = 1;

  return difference([
    cylinder({
      radius: pipeInnerRadius,
      height: pipeInnerInsertHeight,
      fragmentNumber: 128,
    }),
    debug(
      translate([0, 0, -extra], [
        cylinder({
          radius: (pipeInnerRadius - pipeInnerInsertThickness),
          height: (pipeInnerInsertHeight + (extra * 2)),
          fragmentNumber: 128,
        }),
      ]),
    ),
  ]);
}

/*---*/

/** HORIZONTAL FIX **/

export interface IAirVentPipeHorizontalFixBlockOptions {
  horizontalFixOuterRadius: number;
  horizontalFixInnerRadius: number;
  horizontalFixThickness: number;
  horizontalFixScrewRadius: number;
  horizontalFixScrewOffset?: number;
}

export function airVentPipeHorizontalFixFixBlock(
  {
    horizontalFixOuterRadius,
    horizontalFixInnerRadius,
    horizontalFixThickness,
    horizontalFixScrewRadius,
    horizontalFixScrewOffset = (horizontalFixOuterRadius - horizontalFixInnerRadius) * 0.5,
  }: IAirVentPipeHorizontalFixBlockOptions,
): ILines {
  const extra: number = 1;

  const screwHole = (): ILines => {
    const offset: number = horizontalFixOuterRadius - horizontalFixScrewOffset;

    return translate([offset, 0, -extra], [
      cylinder({
        radius: horizontalFixScrewRadius,
        height: (horizontalFixThickness + (extra * 2)),
      }),
    ]);
  };

  const screwHolesAround = (): ILines => {
    return repeat(4, (index: number): ILines => {
      return rotate([0, 0, 90 * index], [
        screwHole(),
      ]);
    });
  };

  return difference([
    cylinder({
      radius: horizontalFixOuterRadius,
      height: horizontalFixThickness,
      fragmentNumber: 128,
    }),
    debug(
      union([
        translate([0, 0, -extra], [
          cylinder({
            radius: horizontalFixInnerRadius,
            height: (horizontalFixThickness + (extra * 2)),
            fragmentNumber: 128,
          }),
        ]),
        screwHolesAround(),
      ]),
    ),
  ]);
}

/*---*/

/** PART 1 **/

export interface IAirVentPipeFixPart1Options extends //
  IAirVentPipeInnerInsertBlockOptions,
  Omit<IAirVentPipeHorizontalFixBlockOptions, 'horizontalFixOuterRadius' | 'horizontalFixInnerRadius'>
//
{
  pipeInnerRadius: number;
  pipeInnerInsertThickness: number;
  horizontalFixWidth: number;
}

export function airVentPipeFixPart1(
  {
    pipeInnerRadius,
    pipeInnerInsertThickness,
    horizontalFixWidth,
    ...options
  }: IAirVentPipeFixPart1Options,
): ILines {
  return union([
    airVentPipeInnerInsertBlock({
      ...options,
      pipeInnerRadius,
      pipeInnerInsertThickness,
    }),
    airVentPipeHorizontalFixFixBlock({
      ...options,
      horizontalFixOuterRadius: (pipeInnerRadius + horizontalFixWidth),
      horizontalFixInnerRadius: (pipeInnerRadius - pipeInnerInsertThickness),
    }),
  ]);
}

/*---*/

/** PART 2 **/

export interface IAirVentPipeFixPart2Options extends //
  Omit<IAirVentPipeHorizontalFixBlockOptions, 'horizontalFixOuterRadius' | 'horizontalFixInnerRadius'>
//
{
  pipeInnerRadius: number;
  horizontalFixWidth: number;
  horizontalFixSpacing: number;
}

export function airVentPipeFixPart2(
  {
    pipeInnerRadius,
    horizontalFixWidth,
    horizontalFixSpacing,
    ...options
  }: IAirVentPipeFixPart2Options,
): ILines {
  return union([
    airVentPipeHorizontalFixFixBlock({
      ...options,
      horizontalFixOuterRadius: (pipeInnerRadius + horizontalFixWidth),
      horizontalFixInnerRadius: (pipeInnerRadius + horizontalFixSpacing),
    }),
  ]);
}

/*---*/

/** PART 3 **/

export interface IAirVentPipeFixPart3CircleBlockOptions {
  pipeOuterRadius: number;
  pipeFixPartThickness: number;
  pipeFixPartHeight: number;
}

export function airVentPipeFixPart3CircleBlock(
  {
    pipeOuterRadius,
    pipeFixPartThickness,
    pipeFixPartHeight,
  }: IAirVentPipeFixPart3CircleBlockOptions,
): ILines {
  const extra: number = 1;
  const outerRadius: number = (pipeOuterRadius + pipeFixPartThickness);
  const removeHeight: number = (pipeFixPartHeight + (extra * 2));

  return difference([
    cylinder({
      radius: outerRadius,
      height: pipeFixPartHeight,
      fragmentNumber: 128,
    }),
    debug(
      union([
        translate([0, 0, -extra], [
          cylinder({
            radius: pipeOuterRadius,
            height: removeHeight,
            fragmentNumber: 128,
          }),
        ]),
        translate([-(outerRadius + extra), 0, -extra], [
          cube({
            size: [(outerRadius + extra) * 2, outerRadius + extra, removeHeight],
          }),
        ]),
      ]),
    ),
  ]);
}

/*---*/

export interface IAirVentPipeFixPart3AttachBlockOptions {
  pipeFixPartAttachWidth: number;
  pipeFixPartAttachThickness: number;
  pipeFixPartAttachScrewRadius: number;

  pipeOuterRadius: number;
  pipeFixPartThickness: number;
  pipeFixPartHeight: number;
}

export function airVentPipeFixPart3AttachBlock(
  {
    pipeFixPartAttachWidth,
    pipeFixPartAttachThickness,
    pipeFixPartAttachScrewRadius,
    pipeOuterRadius,
    pipeFixPartThickness,
    pipeFixPartHeight,
  }: IAirVentPipeFixPart3AttachBlockOptions,
): ILines {
  const extra: number = 1;

  return translate([pipeOuterRadius, -pipeFixPartAttachThickness, 0], [
    difference([
      cube({
        size: [pipeFixPartThickness + pipeFixPartAttachWidth, pipeFixPartAttachThickness, pipeFixPartHeight],
      }),
      debug(
        translate([pipeFixPartThickness + (pipeFixPartAttachWidth * 0.5), (pipeFixPartAttachThickness * 0.5), (pipeFixPartHeight * 0.5)], [
          rotate([90, 0, 0], [
            cylinder({
              radius: pipeFixPartAttachScrewRadius,
              height: pipeFixPartAttachThickness + (extra * 2),
              center: true,
            }),
          ]),
        ]),
      ),
    ]),
  ]);
}

/*---*/

export interface IAirVentPipeFixPart3Options extends //
  IAirVentPipeFixPart3CircleBlockOptions,
  IAirVentPipeFixPart3AttachBlockOptions
//
{
}

export function airVentPipeFixPart3(
  {
    ...options
  }: IAirVentPipeFixPart3Options,
): ILines {
  return union([
    airVentPipeFixPart3CircleBlock({
      ...options,
    }),
    airVentPipeFixPart3AttachBlock({
      ...options,
    }),
    mirror([1, 0, 0], [
      airVentPipeFixPart3AttachBlock({
        ...options,
      }),
    ])
  ]);
}
