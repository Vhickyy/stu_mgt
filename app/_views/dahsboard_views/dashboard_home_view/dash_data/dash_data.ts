import { Semester } from "../../academic_record_view/academic_types";

export interface SetupStep {
  key: string;
  label: string;
  description: string;
  completed: boolean;
  href: string;
}

export interface SetupStatus {
  steps: SetupStep[];
  isComplete: boolean;
  nextStep: SetupStep | null;
}

export function computeSetupStatus(flags: {
  hasGradingSystem: boolean;
  hasSession: boolean;
  hasCurrentSemester: boolean;
  hasCourses: boolean;
}): SetupStatus {
  const steps: SetupStep[] = [
    {
      key: "grading",
      label: "Set up your grading system",
      description: "Define how your GPA is calculated before anything else.",
      completed: flags.hasGradingSystem,
      href: "/grading-system",
    },
    {
      key: "session",
      label: "Create an academic session",
      description: "Add a session and at least one semester.",
      completed: flags.hasSession,
      href: "/sessions-semesters",
    },
    {
      key: "semester",
      label: "Mark a current semester",
      description: "So your dashboard knows what's active right now.",
      completed: flags.hasCurrentSemester,
      href: "/sessions-semesters",
    },
    {
      key: "courses",
      label: "Add your courses",
      description: "Register courses for the current semester.",
      completed: flags.hasCourses,
      href: "/courses",
    },
  ];

  return {
    steps,
    isComplete: steps.every((s) => s.completed),
    nextStep: steps.find((s) => !s.completed) ?? null,
  };
}

export function computeSemesterProgress(
  semester: Semester | null,
): number | null {
  if (!semester) return null;
  const now = Date.now();
  const start = new Date(semester.startDate).getTime();
  const end = new Date(semester.endDate).getTime();
  if (now <= start) return 0;
  if (now >= end) return 100;
  return Math.round(((now - start) / (end - start)) * 100);
}

export function daysRemainingInSemester(
  semester: Semester | null,
): number | null {
  if (!semester) return null;
  const end = new Date(semester.endDate).getTime();
  const now = Date.now();
  if (now >= end) return 0;
  return Math.ceil((end - now) / (1000 * 60 * 60 * 24));
}
