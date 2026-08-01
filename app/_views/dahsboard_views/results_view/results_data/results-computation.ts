import {
  Semester,
  AcademicSession,
} from "../../academic_record_view/academic_types";
import { Course } from "../../courses/courses_types";
import { round2 } from "../../gpa_view/gpa_data/gpa_data";
import { computeRanges } from "../../grading_view/grading_data/grading_data";
import { GradeRow } from "../../grading_view/grading_types";
import { CourseResult } from "../results_types/Results_Type";

export interface CourseResultRow {
  course: Course;
  result: CourseResult | null;
  letter: string | null;
  points: number | null;
  pointsEarned: number | null;
}

export function lookupGrade(
  score: number,
  grades: GradeRow[],
): { letter: string; points: number } | null {
  const ranges = computeRanges(grades);
  const match = ranges.find((r) => score >= r.min && score <= r.max);
  return match ? { letter: match.letter, points: match.points } : null;
}

export function buildCourseResultRows(
  courses: Course[],
  results: CourseResult[],
  grades: GradeRow[],
): CourseResultRow[] {
  return courses.map((course) => {
    const result = results.find((r) => r.courseId === course.id) ?? null;
    if (!result)
      return {
        course,
        result: null,
        letter: null,
        points: null,
        pointsEarned: null,
      };
    const graded = lookupGrade(result.totalScore, grades);
    const pointsEarned = graded
      ? round2(graded.points * course.creditHours)
      : null;
    return {
      course,
      result,
      letter: graded?.letter ?? null,
      points: graded?.points ?? null,
      pointsEarned,
    };
  });
}

export function computeSemesterGPA(rows: CourseResultRow[]) {
  const scored = rows.filter((r) => r.result !== null);
  const totalCreditUnits = scored.reduce(
    (sum, r) => sum + r.course.creditHours,
    0,
  );
  const totalPoints = scored.reduce((sum, r) => sum + (r.pointsEarned ?? 0), 0);
  const gpa =
    totalCreditUnits === 0 ? 0 : round2(totalPoints / totalCreditUnits);
  return {
    totalCreditUnits,
    totalPoints: round2(totalPoints),
    gpa,
    isComplete: rows.length > 0 && scored.length === rows.length,
  };
}

export interface SemesterGPAPoint {
  semesterId: string;
  label: string;
  shortLabel: string;
  gpa: number;
  totalCreditUnits: number;
  totalPoints: number;
  isComplete: boolean;
}

export function computeGPATrend(
  semesters: Semester[],
  sessions: AcademicSession[],
  courses: Course[],
  results: CourseResult[],
  grades: GradeRow[],
): SemesterGPAPoint[] {
  const sorted = [...semesters].sort((a, b) =>
    a.startDate.localeCompare(b.startDate),
  );
  return sorted.map((sem) => {
    const semCourses = courses.filter((c) => c.semesterId === sem.id);
    const semResults = results.filter((r) => r.semesterId === sem.id);
    const rows = buildCourseResultRows(semCourses, semResults, grades);
    const stats = computeSemesterGPA(rows);
    const session = sessions.find((s) => s.id === sem.sessionId);
    return {
      semesterId: sem.id,
      label: `${session?.name ?? ""} - ${sem.name}`,
      shortLabel: sem.name.replace("Semester ", "S"),
      ...stats,
    };
  });
}

export function computeCGPA(
  points: SemesterGPAPoint[],
  uptoSemesterId?: string,
): number | null {
  const idx = uptoSemesterId
    ? points.findIndex((p) => p.semesterId === uptoSemesterId)
    : points.length - 1;
  const relevant = idx >= 0 ? points.slice(0, idx + 1) : points;
  const totalUnits = relevant.reduce((sum, p) => sum + p.totalCreditUnits, 0);
  const totalPts = relevant.reduce((sum, p) => sum + p.totalPoints, 0);
  return totalUnits === 0 ? null : round2(totalPts / totalUnits);
}

export function gpaRemark(gpa: number, pointScaleMax: number): string {
  const pct = pointScaleMax === 0 ? 0 : gpa / pointScaleMax;
  if (pct >= 0.9) return "Excellent performance! Keep it up!";
  if (pct >= 0.7) return "Very good performance.";
  if (pct >= 0.5) return "Good, but there's room to grow.";
  return "Let's work on improving next semester.";
}
