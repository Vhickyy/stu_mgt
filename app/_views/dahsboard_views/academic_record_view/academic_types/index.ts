export interface AcademicSession {
  id: string;
  name: string; // "2024/2025"
  startYear: number;
  endYear: number;
  isActive: boolean;
  intendedSemesterCount: number; // set at creation, informational only
}

export interface Semester {
  id: string;
  sessionId: string;
  name: string; // "Semester 1"
  startDate: string; // ISO date
  endDate: string;
  isCurrent: boolean;
  totalCourses: number; // TODO: replace with real aggregation once Courses feature exists
  totalCreditHours: number; // TODO: same
}
