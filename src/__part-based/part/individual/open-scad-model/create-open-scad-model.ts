import { ILines } from '../../../../misc/lines/lines.type.ts';
import { OPEN_SCAD_MODEL } from '../scad-part-type.enum.ts';
import { IOpenSCADModel } from './open-scad-model.type.ts';

export function createOpenSCADModel(
  lines: ILines,
): IOpenSCADModel {
  return {
    type: OPEN_SCAD_MODEL,
    lines,
  };
}
