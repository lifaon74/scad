export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 1 / DEG_TO_RAD;


export function rad(
  value: number,
): number {
  return value * RAD_TO_DEG;
}

export function deg(
  value: number,
): number {
  return value;
}
