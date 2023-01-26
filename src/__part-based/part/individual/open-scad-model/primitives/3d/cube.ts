import { cube, ICubeOptions } from '../../../../../../open-scad/primitives/3d/cube.ts';
import { ILines } from '../../../misc/lines/lines.type.ts';
import { createOpenSCADModel } from '../../create-open-scad-model.ts';

export function createOpenSCADCube(
  options: ICubeOptions,
): ILines {
  return createOpenSCADModel(
    cube(options),
  );
}
