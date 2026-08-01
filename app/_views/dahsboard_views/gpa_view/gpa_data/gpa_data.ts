import { ScaleType, IGradeOption, ICourse } from "../gpa_types";

export const grade_scale = [
  { letter: "A", min: 4.5, max: 5.0, label: "Excellent", color: "green" },
  { letter: "B", min: 3.5, max: 4.49, label: "Very Good", color: "blue" },
  { letter: "C", min: 2.5, max: 3.49, label: "Good", color: "yellow" },
  { letter: "D", min: 1.5, max: 2.49, label: "Fair", color: "orange" },
  { letter: "E", min: 1.0, max: 1.49, label: "Pass", color: "purple" },
  { letter: "F", min: 0, max: 0.99, label: "Fail", color: "red" },
];

export const grade_color_map: Record<string, string> = {
  green: "bg-green-100  text-green-700  border-green-200",
  blue: "bg-blue-100   text-blue-700   border-blue-200",
  yellow: "bg-yellow-100 text-yellow-700 border-yellow-200",
  orange: "bg-orange-100 text-orange-700 border-orange-200",
  purple: "bg-purple-100 text-purple-700 border-purple-200",
  red: "bg-red-100    text-red-700    border-red-200",
};

// New

export const GRADE_SCALES: Record<ScaleType, IGradeOption[]> = {
  "5.0": [
    { grade: "A", points: 5.0, range: "4.5 - 5.0" },
    { grade: "A-", points: 4.5, range: "4.0 - 4.49" },
    { grade: "B+", points: 4.0, range: "3.5 - 3.99" },
    { grade: "B", points: 3.5, range: "3.0 - 3.49" },
    { grade: "C+", points: 3.0, range: "2.5 - 2.99" },
    { grade: "C", points: 2.5, range: "2.0 - 2.49" },
    { grade: "D+", points: 2.0, range: "1.5 - 1.99" },
    { grade: "D", points: 1.5, range: "1.0 - 1.49" },
    { grade: "F", points: 0, range: "0 - 0.99" },
  ],
  "4.0": [
    { grade: "A", points: 4.0, range: "3.7 - 4.0" },
    { grade: "A-", points: 3.7, range: "3.4 - 3.69" },
    { grade: "B+", points: 3.3, range: "3.1 - 3.39" },
    { grade: "B", points: 3.0, range: "2.8 - 3.09" },
    { grade: "C+", points: 2.7, range: "2.4 - 2.79" },
    { grade: "C", points: 2.3, range: "2.0 - 2.39" },
    { grade: "D+", points: 2.0, range: "1.5 - 1.99" },
    { grade: "D", points: 1.7, range: "1.0 - 1.49" },
    { grade: "F", points: 0, range: "0 - 0.99" },
  ],
};

export const GRADE_BUCKETS = ["A", "B", "C", "D", "F"] as const;
export type GradeBucket = (typeof GRADE_BUCKETS)[number];

export function bucketOf(grade: string): GradeBucket {
  const letter = grade[0] as GradeBucket;
  return GRADE_BUCKETS.includes(letter) ? letter : "F";
}

export function getGradePoint(scale: ScaleType, grade: string): number {
  return GRADE_SCALES[scale].find((g) => g.grade === grade)?.points ?? 0;
}

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function computeSemesterStats(courses: ICourse[], scale: ScaleType) {
  const totalCreditUnits = courses.reduce((sum, c) => sum + c.creditUnits, 0);
  const totalGradePoints = courses.reduce(
    (sum, c) => sum + getGradePoint(scale, c.grade) * c.creditUnits,
    0,
  );
  const gpa = totalCreditUnits === 0 ? 0 : totalGradePoints / totalCreditUnits;

  return {
    totalCreditUnits,
    totalGradePoints: round2(totalGradePoints),
    gpa: round2(gpa),
  };
}

export function computeCGPA(
  currentUnits: number,
  currentPoints: number,
  previousUnits: number,
  previousPoints: number,
): number | null {
  const units = currentUnits + previousUnits;
  if (units === 0) return null;
  return round2((currentPoints + previousPoints) / units);
}

export function gpaRemark(gpa: number, scale: ScaleType): string {
  const max = scale === "5.0" ? 5 : 4;
  const pct = gpa / max;
  if (pct >= 0.9) return "Excellent";
  if (pct >= 0.7) return "Very Good";
  if (pct >= 0.5) return "Good";
  if (pct >= 0.3) return "Fair";
  return "Needs Improvement";
}
