/**
 * Converts the given number of days to milliseconds.
 *
 * @param days The number of days to convert.
 * @returns The equivalent number of milliseconds.
 */
export function daysToMilliseconds(days: number): number {
  return days * 24 * 60 * 60 * 1000
}

/**
 * Converts the given number of days to seconds.
 *
 * @param days The number of days to convert.
 * @returns The equivalent number of seconds.
 */
export function daysToSeconds(days: number): number {
  return days * 24 * 60 * 60
}

/**
 * Converts the given number of hours to milliseconds.
 *
 * @param hours The number of hours to convert.
 * @returns The equivalent number of milliseconds.
 */
export function minutesToMilliseconds(minutes: number): number {
  return minutes * 60 * 1000
}

/**
 * Converts the given number of minutes to seconds.
 *
 * @param minutes The number of minutes to convert.
 * @returns The equivalent number of seconds.
 */
export function minutesToSeconds(minutes: number): number {
  return minutes * 60
}
