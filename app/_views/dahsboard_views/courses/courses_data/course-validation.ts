import { Course } from "../courses_types";
import { ALLOWED_CREDIT_HOURS_PER_SEMESTER } from "./courses_data";

export function isDuplicateCourseCode(
  code: string,
  semesterId: string,
  courses: Course[],
  excludeId?: string,
): boolean {
  const normalized = code.trim().toUpperCase();
  return courses.some(
    (c) =>
      c.semesterId === semesterId &&
      c.code === normalized &&
      c.id !== excludeId,
  );
}

export function creditHourCapError(
  newCreditHours: number,
  semesterId: string,
  courses: Course[],
  excludeId?: string,
): string | null {
  const currentTotal = courses
    .filter((c) => c.semesterId === semesterId && c.id !== excludeId)
    .reduce((sum, c) => sum + c.creditHours, 0);

  const projectedTotal = currentTotal + newCreditHours;

  if (projectedTotal > ALLOWED_CREDIT_HOURS_PER_SEMESTER) {
    const remaining = ALLOWED_CREDIT_HOURS_PER_SEMESTER - currentTotal;
    return remaining <= 0
      ? `You've reached the ${ALLOWED_CREDIT_HOURS_PER_SEMESTER}-credit-hour limit for this semester.`
      : `This would put you at ${projectedTotal} credit hours — only ${remaining} remaining this semester.`;
  }
  return null;
}
