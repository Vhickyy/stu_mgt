export type ScaleType = "5.0" | "4.0";

export interface ICourse {
  id: string;
  code: string;
  title: string;
  creditUnits: number;
  grade: string;
}

export interface IGradeOption {
  grade: string;
  points: number;
  range: string;
}
