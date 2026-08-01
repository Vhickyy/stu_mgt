export type ScoreMode = "breakdown" | "combined";

export interface CourseResult {
  id: string;
  courseId: string;
  semesterId: string;
  mode: ScoreMode;
  testScore?: number;
  testMax?: number;
  examScore?: number;
  examMax?: number;
  totalScore: number; // always present, 0–100 — the single source of truth for grading
  attachmentName?: string;
}
