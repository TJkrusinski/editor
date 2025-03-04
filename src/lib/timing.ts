export const map = (
  currentValue: number,
  inputStart: number,
  inputEnd: number,
  outputStart: number,
  outputEnd: number,
) => {
  return (
    ((currentValue - inputStart) / (inputEnd - inputStart)) *
      (outputEnd - outputStart) + outputStart
  );
};

export const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), max);
};

export function easeInOutMap(
  step: number,
  totalSteps: number,
  min: number,
  max: number,
): number {
  if (totalSteps <= 0) throw new Error('totalSteps must be greater than 0');

  if (step > totalSteps) return max;

  const t = step / totalSteps; // Normalize step to [0,1] range

  const easedT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  return min + easedT * (max - min); // Map to min-max range
}
