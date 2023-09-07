export function randomNumber(
  min: number = 100000,
  max: number = 666666,
): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
