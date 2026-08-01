export type ScaleTemplate = "5.0" | "4.0" | "custom";

export interface GradeRow {
  id: string;
  letter: string;
  points: number;
  min: number; // minimum score (0–100) needed to earn this grade — always a 0–100 domain, independent of point scale
}

export interface RangedGrade extends GradeRow {
  max: number;
}
