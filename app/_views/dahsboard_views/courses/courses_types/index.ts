export type CourseType = "Core" | "Elective";

export interface Course {
  id: string;
  semesterId: string;
  code: string;
  title: string;
  creditHours: number;
  type: CourseType;
}
