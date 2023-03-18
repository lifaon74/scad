import { ILines } from '../../misc/lines/lines.type.ts';
import { transpileBoolean } from '../misc/transpile-boolean.ts';
import { transpileFunctionBlockMulti } from '../misc/transpile-function-block.ts';
import { optionalFunctionArgument } from '../misc/transpile-function-call.ts';
import { transpileNumber } from '../misc/transpile-number.ts';
import { transpileVector3D } from '../misc/transpile-vector-3d.ts';
import { difference } from '../modeling/difference.ts';
import { union } from '../modeling/union.ts';
import { cube } from '../primitives/3d/cube.ts';
import { sphere } from '../primitives/3d/sphere.ts';
import { IVector3d } from '../types/vector-3d.type.ts';
import { minkowski } from './minkowski.ts';

// https://github.com/nophead/NopSCADlib/blob/master/utils/offset.scad


export interface IOffset3dOptions {
  radius: number;
  chamferBase?: boolean;
}

export function offset3d(
  {
    radius,
    chamferBase = false,
  }: IOffset3dOptions,
  expressions: ILines[],
): ILines {
  const ball = (radius: number): ILines => {
    if (chamferBase) {
      /*
       rotate_extrude()
                intersection() {
                    rotate(180)
                        teardrop(0, r);

                    translate([0, -r])
                        square([r, 2 * r]);
                }
       */
      throw 'TODO';
      // return [];
    } else {
      return sphere({
        radius,
      });
    }
  };

  if (radius > 0) {
    return minkowski([
      union(expressions),
      ball(radius),
    ]);
  } else if (radius < 0) {
    // const side = Number.POSITIVE_INFINITY;
    const side = 1000;
    const halfSide = side / 2;

    return difference([
      cube({
        size: [halfSide, halfSide, halfSide],
        center: true,
      }),
      minkowski([
        difference([
          cube({
            size: [side, side, side],
            center: true,
          }),
          union(expressions),
        ]),
        ball(-radius),
      ]),
    ]);
  } else {
    return union(expressions);
  }
}
