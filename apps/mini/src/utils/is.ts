/**
 * Check if a value is a regular expression.
 *
 * @param input - value to check
 * @returns boolean
 */
export function isRegexp(input: unknown): input is RegExp {
  return Object.prototype.toString.call(input) === '[object RegExp]'
}
