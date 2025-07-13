import { Lines } from '../../../misc/lines/lines.ts';
import { color } from '../../../open-scad/build/transformations/color.ts';
import { GRASS_MATERIAL } from '../../../open-scad/build/color/built-in/grass.ts';
import { rectangle } from '../../../open-scad/build/primitives/2d/rectangle.ts';
import { meter } from '../../../open-scad/build/math/units/length/meter.ts';


export function houseLand(): Lines {
  return color(GRASS_MATERIAL, [
    rectangle({ size: [meter(10), meter(15)], center: false }),
  ])
}
