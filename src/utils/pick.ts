/**
 * Pick the keys from the object
 * @param obj Object to pick keys from
 * @param keys Keys to pick
 * @returns Object with picked keys
 */
const pick = (obj: object, keys: string[]) => {
  return keys.reduce<Record<string, unknown>>((finalObj, key) => {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObj[key] = obj[key as keyof typeof obj]
    }
    return finalObj
  }, {})
}

export default pick
