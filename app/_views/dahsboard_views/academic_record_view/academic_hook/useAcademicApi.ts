"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { academicApi } from "../academic_data/academic_data";

const SESSIONS_KEY = ["academic-sessions"];
const SEMESTERS_KEY = ["semesters"];

export function useSessions() {
  return useQuery({ queryKey: SESSIONS_KEY, queryFn: academicApi.getSessions });
}

export function useSemesters() {
  return useQuery({
    queryKey: SEMESTERS_KEY,
    queryFn: academicApi.getSemesters,
  });
}

export function useCreateSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: academicApi.createSession,
    onSuccess: () => qc.invalidateQueries({ queryKey: SESSIONS_KEY }),
  });
}

export function useSetActiveSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: academicApi.setActiveSession,
    onSuccess: () => qc.invalidateQueries({ queryKey: SESSIONS_KEY }),
  });
}

export function useDeleteSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: academicApi.deleteSession,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: SESSIONS_KEY });
      qc.invalidateQueries({ queryKey: SEMESTERS_KEY });
    },
  });
}

export function useCreateSemester() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: academicApi.createSemester,
    onSuccess: () => qc.invalidateQueries({ queryKey: SEMESTERS_KEY }),
  });
}

export function useSetCurrentSemester() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: academicApi.setCurrentSemester,
    onSuccess: () => qc.invalidateQueries({ queryKey: SEMESTERS_KEY }),
  });
}

export function useDeleteSemester() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: academicApi.deleteSemester,
    onSuccess: () => qc.invalidateQueries({ queryKey: SEMESTERS_KEY }),
  });
}
