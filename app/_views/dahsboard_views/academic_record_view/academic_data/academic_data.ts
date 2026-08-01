import { AcademicSession, Semester } from "../academic_types";

export function validateNewSessionYear(
  startYear: number,
  existing: AcademicSession[],
): string | null {
  if (!startYear || startYear < 2000 || startYear > 2100)
    return "Choose a valid start year.";
  if (existing.some((s) => s.startYear === startYear)) {
    return `A session for ${startYear}/${startYear + 1} already exists.`;
  }
  return null;
}

export function validateSemesterDates(
  input: { startDate: string; endDate: string },
  session: AcademicSession,
  existingInSession: Semester[],
  excludeId?: string,
): string | null {
  const start = new Date(input.startDate);
  const end = new Date(input.endDate);

  if (!input.startDate || !input.endDate)
    return "Both start and end dates are required.";
  if (end <= start) return "End date must be after start date.";

  const sessionStart = new Date(`${session.startYear}-01-01`);
  const sessionEnd = new Date(`${session.endYear}-12-31`);
  if (start < sessionStart || end > sessionEnd) {
    return `Dates must fall within the ${session.name} academic year.`;
  }

  const overlaps = existingInSession.some((sem) => {
    if (sem.id === excludeId) return false;
    const semStart = new Date(sem.startDate);
    const semEnd = new Date(sem.endDate);
    return start <= semEnd && end >= semStart;
  });
  if (overlaps)
    return "This period overlaps with another semester in this session.";

  return null;
}

function delay<T>(data: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}

function id() {
  return crypto.randomUUID();
}

// --- in-memory "database" ---
let sessions: AcademicSession[] = [
  {
    id: "s1",
    name: "2024/2025",
    startYear: 2024,
    endYear: 2025,
    isActive: true,
    intendedSemesterCount: 2,
  },
  {
    id: "s2",
    name: "2023/2024",
    startYear: 2023,
    endYear: 2024,
    isActive: false,
    intendedSemesterCount: 2,
  },
  {
    id: "s3",
    name: "2022/2023",
    startYear: 2022,
    endYear: 2023,
    isActive: false,
    intendedSemesterCount: 2,
  },
];

let semesters: Semester[] = [
  {
    id: "sem1",
    sessionId: "s1",
    name: "Semester 1",
    startDate: "2025-01-01",
    endDate: "2025-04-30",
    isCurrent: false,
    totalCourses: 5,
    totalCreditHours: 18,
  },
  {
    id: "sem2",
    sessionId: "s1",
    name: "Semester 2",
    startDate: "2025-05-01",
    endDate: "2025-08-31",
    isCurrent: true,
    totalCourses: 6,
    totalCreditHours: 18,
  },
];

// --- Sessions ---
export const academicApi = {
  getSessions: () =>
    delay([...sessions].sort((a, b) => b.startYear - a.startYear)),

  createSession: (input: {
    startYear: number;
    intendedSemesterCount: number;
  }) => {
    const newSession: AcademicSession = {
      id: id(),
      name: `${input.startYear}/${input.startYear + 1}`,
      startYear: input.startYear,
      endYear: input.startYear + 1,
      isActive: false,
      intendedSemesterCount: input.intendedSemesterCount,
    };
    sessions = [...sessions, newSession];
    return delay(newSession);
  },

  setActiveSession: (sessionId: string) => {
    sessions = sessions.map((s) => ({ ...s, isActive: s.id === sessionId }));
    return delay(sessions.find((s) => s.id === sessionId)!);
  },

  deleteSession: (sessionId: string) => {
    sessions = sessions.filter((s) => s.id !== sessionId);
    semesters = semesters.filter((sem) => sem.sessionId !== sessionId);
    return delay({ success: true });
  },

  // --- Semesters ---
  getSemesters: () => delay([...semesters]),

  createSemester: (
    input: Omit<
      Semester,
      "id" | "isCurrent" | "totalCourses" | "totalCreditHours"
    >,
  ) => {
    const newSemester: Semester = {
      ...input,
      id: id(),
      isCurrent: false,
      totalCourses: 0,
      totalCreditHours: 0,
    };
    semesters = [...semesters, newSemester];
    return delay(newSemester);
  },

  setCurrentSemester: (semesterId: string) => {
    semesters = semesters.map((s) => ({
      ...s,
      isCurrent: s.id === semesterId,
    }));
    return delay(semesters.find((s) => s.id === semesterId)!);
  },

  deleteSemester: (semesterId: string) => {
    semesters = semesters.filter((s) => s.id !== semesterId);
    return delay({ success: true });
  },
};
