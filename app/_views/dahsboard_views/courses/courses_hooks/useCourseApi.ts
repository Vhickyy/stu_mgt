"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesApi } from "../courses_data/courses_data";

const COURSES_KEY = ["courses"];

export function useCourses() {
  return useQuery({ queryKey: COURSES_KEY, queryFn: coursesApi.getCourses });
}

export function useCreateCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: coursesApi.createCourse,
    onSuccess: () => qc.invalidateQueries({ queryKey: COURSES_KEY }),
  });
}

export function useUpdateCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      patch,
    }: {
      id: string;
      patch: Parameters<typeof coursesApi.updateCourse>[1];
    }) => coursesApi.updateCourse(id, patch),
    onSuccess: () => qc.invalidateQueries({ queryKey: COURSES_KEY }),
  });
}

export function useDeleteCourse() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: coursesApi.deleteCourse,
    onSuccess: () => qc.invalidateQueries({ queryKey: COURSES_KEY }),
  });
}
