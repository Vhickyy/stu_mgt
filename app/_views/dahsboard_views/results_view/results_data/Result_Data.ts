import { CourseResult } from "../results_types/Results_Type";

function delay<T>(data: T, ms = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms));
}
function id() {
  return crypto.randomUUID();
}

let results: CourseResult[] = [
  {
    id: "r1",
    courseId: "c1",
    semesterId: "sem2",
    mode: "breakdown",
    testScore: 28,
    testMax: 30,
    examScore: 62,
    examMax: 70,
    totalScore: 90,
  },
  {
    id: "r2",
    courseId: "c2",
    semesterId: "sem2",
    mode: "breakdown",
    testScore: 22,
    testMax: 30,
    examScore: 55,
    examMax: 70,
    totalScore: 77,
  },
  {
    id: "r3",
    courseId: "c3",
    semesterId: "sem2",
    mode: "combined",
    totalScore: 82,
  },
  {
    id: "r4",
    courseId: "c4",
    semesterId: "sem2",
    mode: "breakdown",
    testScore: 25,
    testMax: 30,
    examScore: 65,
    examMax: 70,
    totalScore: 90,
  },
  {
    id: "r5",
    courseId: "c5",
    semesterId: "sem2",
    mode: "combined",
    totalScore: 68,
  },
  {
    id: "r6",
    courseId: "c7",
    semesterId: "sem1",
    mode: "combined",
    totalScore: 88,
  },
  // c8 (sem1) intentionally left without a result, to exercise the "incomplete results" state
];

export const resultsApi = {
  getResults: () => delay([...results]),

  saveResults: (input: Omit<CourseResult, "id">[]) => {
    input.forEach((r) => {
      const existingIndex = results.findIndex(
        (x) => x.courseId === r.courseId && x.semesterId === r.semesterId,
      );
      if (existingIndex >= 0)
        results[existingIndex] = { ...results[existingIndex], ...r };
      else results = [...results, { ...r, id: id() }];
    });
    return delay([...results]);
  },

  deleteResult: (resultId: string) => {
    results = results.filter((r) => r.id !== resultId);
    return delay({ success: true });
  },
};
