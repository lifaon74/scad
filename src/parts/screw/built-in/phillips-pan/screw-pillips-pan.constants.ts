import { ILines } from '../../../../misc/lines/lines.type.ts';
import { SCREW_M3, SCREW_M4 } from '../../body/screw-body.constants.ts';
import { PHILLIPS_PAN_HEAD_M3, PHILLIPS_PAN_HEAD_M4 } from '../../head/phillips-pan/screw-pillips-pan-head.constants.ts';
import { IScrewPhillipsPanOptions, screwPhillipsPan } from './screw-phillips-pan.ts';

export type IScrewPhillipsPanAutoOptions =
  Omit<IScrewPhillipsPanOptions, 'body'>
  & {
  body: Omit<IScrewPhillipsPanOptions['body'], 'height'>
}

export const PHILLIPS_PAN_M3: IScrewPhillipsPanAutoOptions = {
  head: PHILLIPS_PAN_HEAD_M3,
  body: SCREW_M3,
};

export const PHILLIPS_PAN_M4: IScrewPhillipsPanAutoOptions = {
  head: PHILLIPS_PAN_HEAD_M4,
  body: SCREW_M4,
};

export function screwPhillipsPanAuto(
  options: IScrewPhillipsPanAutoOptions,
  height: number,
): ILines {
  return screwPhillipsPan({
    ...options,
    body: {
      ...options.body,
      height,
    },
  });
}
