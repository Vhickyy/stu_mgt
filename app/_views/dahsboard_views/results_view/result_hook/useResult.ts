"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { resultsApi } from "../results_data/Result_Data";
import { gradingApi } from "../../grading_view/grading_data/grading_data";

const RESULTS_KEY = ["results"];

export function useResults() {
  return useQuery({ queryKey: RESULTS_KEY, queryFn: resultsApi.getResults });
}

export function useSaveResults() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: resultsApi.saveResults,
    onSuccess: () => qc.invalidateQueries({ queryKey: RESULTS_KEY }),
  });
}

export function useDeleteResult() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: resultsApi.deleteResult,
    onSuccess: () => qc.invalidateQueries({ queryKey: RESULTS_KEY }),
  });
}

export function useSavedGradingSystem() {
  return useQuery({
    queryKey: ["grading-system"],
    queryFn: gradingApi.getGradingSystem,
  });
}
