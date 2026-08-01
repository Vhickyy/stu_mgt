import { Course } from "../courses_types";

export const PROGRAM_TOTAL_CREDIT_HOURS = 126;
export const ALLOWED_CREDIT_HOURS_PER_SEMESTER = 21;

function delay<T>(data: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

function id() {
  return crypto.randomUUID();
}

// --- in-memory "database" — keyed against the semester ids from lib/academic-api.ts ---
let courses: Course[] = [
  {
    id: "c1",
    semesterId: "sem2",
    code: "CSC402",
    title: "Software Engineering",
    creditHours: 3,
    type: "Core",
  },
  {
    id: "c2",
    semesterId: "sem2",
    code: "MTH401",
    title: "Discrete Mathematics",
    creditHours: 3,
    type: "Core",
  },
  {
    id: "c3",
    semesterId: "sem2",
    code: "GST402",
    title: "Entrepreneurship",
    creditHours: 2,
    type: "Core",
  },
  {
    id: "c4",
    semesterId: "sem2",
    code: "PHY401",
    title: "Physics II",
    creditHours: 3,
    type: "Core",
  },
  {
    id: "c5",
    semesterId: "sem2",
    code: "ENG402",
    title: "Technical Writing",
    creditHours: 2,
    type: "Elective",
  },
  {
    id: "c6",
    semesterId: "sem2",
    code: "STA401",
    title: "Statistics",
    creditHours: 3,
    type: "Elective",
  },
  {
    id: "c7",
    semesterId: "sem1",
    code: "CSC401",
    title: "Operating Systems",
    creditHours: 3,
    type: "Core",
  },
  {
    id: "c8",
    semesterId: "sem1",
    code: "MTH301",
    title: "Linear Algebra",
    creditHours: 3,
    type: "Core",
  },
];

export const coursesApi = {
  getCourses: () => delay([...courses]),

  createCourse: (input: Omit<Course, "id">) => {
    const newCourse: Course = {
      ...input,
      id: id(),
      code: input.code.trim().toUpperCase(),
    };
    courses = [...courses, newCourse];
    return delay(newCourse);
  },

  updateCourse: (
    courseId: string,
    patch: Partial<Omit<Course, "id" | "semesterId">>,
  ) => {
    courses = courses.map((c) =>
      c.id === courseId
        ? { ...c, ...patch, code: (patch.code ?? c.code).trim().toUpperCase() }
        : c,
    );
    return delay(courses.find((c) => c.id === courseId)!);
  },

  deleteCourse: (courseId: string) => {
    courses = courses.filter((c) => c.id !== courseId);
    return delay({ success: true });
  },
};
