import { ILines } from '../../../../misc/lines/lines.type.ts';
import { OPEN_SCAD_MODEL } from '../scad-part-type.enum.ts';

export interface IOpenSCADModel {
  type: typeof OPEN_SCAD_MODEL;
  lines: ILines;
}
