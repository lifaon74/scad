import { Lines } from '../../../../misc/lines/lines.ts';
import { translate } from '../../../../open-scad/build/transformations/translate.ts';
import { ScrewBodyOptions, screwBody } from '../../body/screw-body.ts';
import { ScrewPhillipsPanHeadOptions, screwPhillipsPanHead } from '../../head/phillips-pan/screw-phillips-pan-head.ts';
import { union } from '../../../../open-scad/build/modeling/union.ts';
import { MICRO_OFFSET } from '../../../../open-scad/build/math/micro-offset.ts';

export interface ScrewPhillipsPanOptions {
  readonly head: ScrewPhillipsPanHeadOptions;
  readonly body: ScrewBodyOptions;
}

export function screwPhillipsPan(
  {
    head,
    body,
  }: ScrewPhillipsPanOptions,
): Lines {
  return union([
    translate([0, 0, (head.height * 0.5) - MICRO_OFFSET], [
      screwPhillipsPanHead(head),
    ]),
    translate([0, 0, -(body.height * 0.5)], [
      screwBody(body),
    ]),
  ]);
}
