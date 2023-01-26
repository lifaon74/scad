import { ILines } from '../../../../misc/lines/lines.type.ts';
import { MICRO_OFFSET } from '../../../../open-scad/math/micro-offset.ts';
import { union } from '../../../../open-scad/modeling/union.ts';
import { translate } from '../../../../open-scad/transformations/translate.ts';
import { IScrewBodyOptions, screwBody } from '../../body/screw-body.ts';
import { IScrewPhillipsPanHeadOptions, screwPhillipsPanHead } from '../../head/phillips-pan/screw-phillips-pan-head.ts';

export interface IScrewPhillipsPanOptions {
  head: IScrewPhillipsPanHeadOptions;
  body: IScrewBodyOptions;
}


export function screwPhillipsPan(
  {
    head,
    body,
  }: IScrewPhillipsPanOptions,
): ILines {
  return union([
    translate([0, 0, (head.height * 0.5) - MICRO_OFFSET], [
      screwPhillipsPanHead(head),
    ]),
    translate([0, 0, -(body.height * 0.5)], [
      screwBody(body),
    ]),
  ]);
}
