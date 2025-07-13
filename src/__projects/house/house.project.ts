import { Lines } from '../../misc/lines/lines.ts';
import { exportToScad } from '../../open-scad/export/export-to-scad.ts';
import { houseLand } from './land/land.ts';
import { union } from '../../open-scad/build/modeling/union.ts';


function house(): Lines {
  return union([
    houseLand()
  ])
}

export async function houseProject() {
  await exportToScad('./dist/debug.scad', house());
}
