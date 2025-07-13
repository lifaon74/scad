/**
 * Converts a boolean value into openscad syntax.
 */
export function transpileBoolean(
  input: boolean,
): string {
  return input
    ? 'true'
    : 'false';
}
