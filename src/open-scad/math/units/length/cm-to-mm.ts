export const CM_TO_MM = 10;
export const MM_TO_CM = 1 / CM_TO_MM;


export function cm(
  value: number,
): number {
  return value * CM_TO_MM;
}

export function mm(
  value: number,
): number {
  return value;
}

export function meter(
  value: number,
): number {
  return value * 100;
}
