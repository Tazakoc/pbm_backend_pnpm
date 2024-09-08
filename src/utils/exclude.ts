/**
 * Exclude keys from an object
 * @param obj Object to exclude keys from
 * @param keys Keys to exclude
 * @returns Object without excluded keys
 */
const exclude = <Type, Key extends keyof Type>(obj: Type, keys: Key[]): Omit<Type, Key> => {
  const result = { ...obj }
  for (const key of keys) {
    delete result[key]
  }
  return result
}

export default exclude
