import { ScoreMode } from "../results_types/Results_Type";

export interface ScoreInput {
  mode: ScoreMode;
  testScore?: number;
  testMax?: number;
  examScore?: number;
  examMax?: number;
  totalScore?: number;
}

export function validateScoreInput(input: ScoreInput): string | null {
  if (input.mode === "combined") {
    if (input.totalScore === undefined || Number.isNaN(input.totalScore))
      return "Enter a total score.";
    if (input.totalScore < 0 || input.totalScore > 100)
      return "Total score must be between 0 and 100.";
    return null;
  }

  const { testScore, testMax, examScore, examMax } = input;
  if (testMax === undefined || examMax === undefined)
    return "Set the max marks for Test and Exam.";
  if (testMax + examMax !== 100)
    return `Test max + Exam max must add up to 100 (currently ${testMax + examMax}).`;
  if (testScore === undefined || examScore === undefined)
    return "Enter both Test and Exam scores.";
  if (testScore < 0 || testScore > testMax)
    return `Test score can't exceed ${testMax}.`;
  if (examScore < 0 || examScore > examMax)
    return `Exam score can't exceed ${examMax}.`;
  return null;
}

export function computeTotal(input: ScoreInput): number {
  return input.mode === "combined"
    ? (input.totalScore ?? 0)
    : (input.testScore ?? 0) + (input.examScore ?? 0);
}
