/**
 * It takes a number of seconds and returns a string in the format of HH:MM:SS
 * @param elapsedSeconds - The number of seconds to convert to hours, minutes, and seconds.
 */
export function secondsToHms(elapsedSeconds) {
  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = Math.floor((elapsedSeconds % 3600) % 60);

  const pad = (value) => (value < 10 ? "0" + value : value);

  return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

/**
 * Convert seconds to minutes.
 * @param elapsedSeconds - The number of seconds that have elapsed.
 * @returns The number of minutes in the given number of seconds.
 */
export function secondsToMin(elapsedSeconds) {
  return elapsedSeconds / 60;
}
