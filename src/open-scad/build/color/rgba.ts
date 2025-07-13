
export type Rgba = [
  r: number,
  g: number,
  b: number,
  a?: number,
];


export function rgba(r: number, g: number, b: number, a: number = 1): Rgba {
  return [r / 255, g / 255, b / 255, a];
}

