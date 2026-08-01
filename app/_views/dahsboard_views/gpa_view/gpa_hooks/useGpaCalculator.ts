"use client";

import { useMemo, useState, useCallback } from "react";
import { computeSemesterStats, computeCGPA } from "../gpa_data/gpa_data";
import { ICourse, ScaleType } from "../gpa_types";

interface PreviousRecord {
  cumulativeUnits: number;
  cumulativePoints: number;
}

export function useGPACalculator(initial: ICourse[] = []) {
  const [scale, setScale] = useState<ScaleType>("5.0");
  const [courses, setCourses] = useState<ICourse[]>(initial);
  const [previous, setPrevious] = useState<PreviousRecord | null>(null);

  const stats = useMemo(
    () => computeSemesterStats(courses, scale),
    [courses, scale],
  );

  const cgpa = useMemo(() => {
    if (!previous) return null;
    return computeCGPA(
      stats.totalCreditUnits,
      stats.totalGradePoints,
      previous.cumulativeUnits,
      previous.cumulativePoints,
    );
  }, [previous, stats]);

  const addCourse = useCallback((course: Omit<ICourse, "id">) => {
    setCourses((prev) => [
      ...prev,
      {
        ...course,
        id: crypto.randomUUID(),
        code: course.code.trim().toUpperCase(),
      },
    ]);
  }, []);

  const updateCourse = useCallback((id: string, patch: Partial<ICourse>) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, ...patch, code: (patch.code ?? c.code).toUpperCase() }
          : c,
      ),
    );
  }, []);

  const removeCourse = useCallback((id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const reset = useCallback(() => setCourses([]), []);

  const isDuplicateCode = useCallback(
    (code: string, excludeId?: string) =>
      courses.some(
        (c) => c.code === code.trim().toUpperCase() && c.id !== excludeId,
      ),
    [courses],
  );

  return {
    scale,
    setScale,
    courses,
    stats,
    cgpa,
    previous,
    setPrevious,
    addCourse,
    updateCourse,
    removeCourse,
    reset,
    isDuplicateCode,
  };
}
