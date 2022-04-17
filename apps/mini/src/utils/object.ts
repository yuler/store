/**
 * Pick object keys and values into a new object.
 *
 * @source Other libs
 * https://npm.im/filter-obj
 * https://npm.im/lodash.pick
 * https://npm.im/only
 *
 * @param object - Source object to pick properties from.
 * @param keys - Property name that should be assigned to the new object.
 * @returns
 */
export function pick<
  ObjectType extends Record<string, any>,
  Keys extends keyof ObjectType,
>(object: ObjectType, keys: readonly Keys[]): Pick<ObjectType, Keys> {
  const result = {}

  for (const key of Object.values(keys)) {
    if (key in object) {
      Object.defineProperty(result, key, {
        value: object[key],
        writable: true,
        enumerable: true,
        configurable: true,
      })
    }
  }

  return result as Pick<ObjectType, Keys>
}
