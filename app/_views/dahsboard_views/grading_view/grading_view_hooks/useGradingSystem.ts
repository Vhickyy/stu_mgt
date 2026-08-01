"use client";

import { useCallback, useMemo, useState } from "react";
import {
  DEFAULT_TEMPLATES,
  withIds,
  makeId,
  validateGrades,
  computeRanges,
} from "../grading_data/grading_data";
import { GradeRow, ScaleTemplate } from "../grading_types";

/** Bottom row's min is always 0 — enforce it structurally, not just via validation. */
function normalize(rows: GradeRow[]): GradeRow[] {
  if (rows.length === 0) return rows;
  const next = [...rows];
  next[next.length - 1] = { ...next[next.length - 1], min: 0 };
  return next;
}

export function useGradingSystem() {
  const [template, setTemplate] = useState<ScaleTemplate>("5.0");
  const [scaleMax, setScaleMax] = useState<number>(
    DEFAULT_TEMPLATES["5.0"].scaleMax,
  );
  const [grades, setGrades] = useState<GradeRow[]>(
    normalize(withIds(DEFAULT_TEMPLATES["5.0"].grades)),
  );
  const [locked, setLocked] = useState(false);
  const [saving, setSaving] = useState(false);

  const applyTemplate = useCallback((t: ScaleTemplate) => {
    setTemplate(t);
    if (t === "custom") {
      setScaleMax(4);
      setGrades(normalize(withIds([{ letter: "A", points: 4, min: 0 }])));
    } else {
      setScaleMax(DEFAULT_TEMPLATES[t].scaleMax);
      setGrades(normalize(withIds(DEFAULT_TEMPLATES[t].grades)));
    }
  }, []);

  const updateGrade = useCallback(
    (id: string, patch: Partial<Omit<GradeRow, "id">>) => {
      setGrades((prev) =>
        normalize(prev.map((g) => (g.id === id ? { ...g, ...patch } : g))),
      );
    },
    [],
  );

  const addGrade = useCallback(() => {
    // insert just above the fixed bottom (0-min) row, with a sensible midpoint default
    setGrades((prev) => {
      if (prev.length === 0)
        return normalize([{ id: makeId(), letter: "", points: 0, min: 0 }]);
      const insertAt = prev.length - 1;
      const above = prev[insertAt - 1];
      const below = prev[insertAt];
      const ceiling = above ? above.min : scaleMax;
      const floor = below.min;
      const mid = Math.round(((ceiling + floor) / 2) * 100) / 100;
      const newRow: GradeRow = {
        id: makeId(),
        letter: "",
        points: 0,
        min: mid,
      };
      const next = [...prev];
      next.splice(insertAt, 0, newRow);
      return normalize(next);
    });
  }, [scaleMax]);

  const removeGrade = useCallback((id: string) => {
    setGrades((prev) =>
      prev.length > 1 ? normalize(prev.filter((g) => g.id !== id)) : prev,
    );
  }, []);

  const moveGrade = useCallback((id: string, direction: "up" | "down") => {
    setGrades((prev) => {
      const index = prev.findIndex((g) => g.id === id);
      const swapWith = direction === "up" ? index - 1 : index + 1;
      if (index === -1 || swapWith < 0 || swapWith >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[swapWith]] = [next[swapWith], next[index]];
      return normalize(next);
    });
  }, []);

  const errors = useMemo(
    () => validateGrades(grades, scaleMax),
    [grades, scaleMax],
  );
  const isValid = errors.length === 0;
  const ranges = useMemo(
    () => computeRanges(grades, scaleMax),
    [grades, scaleMax],
  );

  const save = useCallback(async () => {
    if (!isValid) return false;
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    setSaving(false);
    setLocked(true);
    return true;
  }, [isValid]);

  return {
    template,
    scaleMax,
    setScaleMax,
    grades,
    applyTemplate,
    updateGrade,
    addGrade,
    removeGrade,
    moveGrade,
    errors,
    isValid,
    ranges,
    locked,
    saving,
    save,
  };
}
