import { Lines } from '../lines.ts';
import { linesToString } from './lines-to-string.ts';

export function afterLastLine(
  linesA: Lines,
  linesB: Lines,
): Lines {
  return [
    ...linesA.slice(0, -1),
    `${linesToString(linesA.slice(-1))}${linesToString(linesB.slice(0, 1))}`,
    ...linesB.slice(1),
  ];
}

export function inlineLastLines(
  ...lines: Lines[]
): Lines {
  return lines.reduce(afterLastLine, []);
}

// export function afterLastLine(
//   lines: ILines[],
// ): ILines {
//   const _lines: ILines = [];
//
//   for (let i = 0, l = lines.length - 1; i <= l; i++) {
//     const linesA: ILines = lines[i];
//
//     if (i === 0) {
//       _lines.push(...linesA.slice(0, -1));
//     } else {
//       _lines.push(...linesA.slice(1, -1));
//     }
//
//     if (i === l) {
//       _lines.push(...linesA.slice(1));
//     } else {
//       _lines.push(`${linesToString(linesA.slice(-1))}${linesToString(lines[i + 1].slice(0, 1))}`,);
//     }
//   }
//
//   return _lines;
// }

