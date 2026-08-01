"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Info, Upload } from "lucide-react";
import App_Button from "@/app/_components/app_ui/App_Button";
import App_Modal from "@/app/_components/app_ui/App_Modal";
import App_Text from "@/app/_components/app_ui/App_Text";
import { cn } from "@/lib/utils";
import { Course } from "../../courses/courses_types";
import { GradeRow } from "../../grading_view/grading_types";
import {
  validateScoreInput,
  computeTotal,
} from "../results_data/result-validation";
import { lookupGrade } from "../results_data/results-computation";
import { ScoreMode, CourseResult } from "../results_types/Results_Type";

type Step = "scores" | "review" | "success";

interface RowState {
  course: Course;
  mode: ScoreMode;
  testScore: string;
  testMax: string;
  examScore: string;
  examMax: string;
  totalScore: string;
  error: string | null;
}

interface EnterResultsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  semesterId: string;
  semesterLabel: string;
  courses: Course[];
  existingResults: CourseResult[];
  grades: GradeRow[];
  onSave: (input: Omit<CourseResult, "id">[]) => Promise<void>;
}

const SECONDARY_BUTTON = "bg-white border text-gray-700 hover:bg-gray-50";

function toRowState(course: Course, existing?: CourseResult): RowState {
  return {
    course,
    mode: existing?.mode ?? "combined",
    testScore: existing?.testScore?.toString() ?? "",
    testMax: existing?.testMax?.toString() ?? "30",
    examScore: existing?.examScore?.toString() ?? "",
    examMax: existing?.examMax?.toString() ?? "70",
    totalScore:
      existing?.mode === "combined" ? existing.totalScore.toString() : "",
    error: null,
  };
}

const EnterResultsDialog = ({
  open,
  onOpenChange,
  semesterId,
  semesterLabel,
  courses,
  existingResults,
  grades,
  onSave,
}: EnterResultsDialogProps) => {
  const [step, setStep] = useState<Step>("scores");
  const [rows, setRows] = useState<RowState[]>([]);
  const [attachment, setAttachment] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const resetState = () => {
    setStep("scores");
    setAttachment(null);
    setSaving(false);
    setRows(
      courses.map((course) =>
        toRowState(
          course,
          existingResults.find((r) => r.courseId === course.id),
        ),
      ),
    );
  };

  useEffect(() => {
    if (open) resetState();
  }, [open, courses, existingResults]);

  const updateRow = (courseId: string, patch: Partial<RowState>) => {
    setRows((prev) =>
      prev.map((row) =>
        row.course.id === courseId ? { ...row, ...patch, error: null } : row,
      ),
    );
  };

  const handleNext = () => {
    const validated = rows.map((row) => {
      const error = validateScoreInput({
        mode: row.mode,
        totalScore: row.totalScore === "" ? undefined : Number(row.totalScore),
        testScore: row.testScore === "" ? undefined : Number(row.testScore),
        testMax: row.testMax === "" ? undefined : Number(row.testMax),
        examScore: row.examScore === "" ? undefined : Number(row.examScore),
        examMax: row.examMax === "" ? undefined : Number(row.examMax),
      });

      return { ...row, error };
    });

    setRows(validated);

    if (validated.every((row) => row.error === null)) {
      setStep("review");
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const payload: Omit<CourseResult, "id">[] = rows.map((row) => {
        const total = computeTotal({
          mode: row.mode,
          totalScore:
            row.totalScore === "" ? undefined : Number(row.totalScore),
          testScore: row.testScore === "" ? undefined : Number(row.testScore),
          examScore: row.examScore === "" ? undefined : Number(row.examScore),
        });

        return {
          courseId: row.course.id,
          semesterId,
          mode: row.mode,
          testScore:
            row.mode === "breakdown" ? Number(row.testScore) : undefined,
          testMax: row.mode === "breakdown" ? Number(row.testMax) : undefined,
          examScore:
            row.mode === "breakdown" ? Number(row.examScore) : undefined,
          examMax: row.mode === "breakdown" ? Number(row.examMax) : undefined,
          totalScore: total,
          attachmentName: attachment ?? undefined,
        };
      });

      await onSave(payload);
      setStep("success");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <App_Modal onClose={() => onOpenChange(false)} text="Enter Results">
      {step === "scores" && (
        <div className="space-y-5 max-h-[75vh] overflow-y-auto pr-1">
          {" "}
          <div className="space-y-1">
            <App_Text type="cardhead" text="Enter Results" />{" "}
            <p className="text-sm text-gray-500">{semesterLabel} </p>{" "}
          </div>
          {rows.map((row) => (
            <div
              key={row.course.id}
              className="rounded-xl border border-gray-200 p-4 space-y-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-gray-900">{row.course.code}</p>
                  <p className="text-sm text-gray-500">{row.course.title}</p>
                </div>

                <div className="flex rounded-lg border overflow-hidden text-xs">
                  <button
                    type="button"
                    onClick={() =>
                      updateRow(row.course.id, {
                        mode: "combined",
                      })
                    }
                    className={cn(
                      "px-3 py-2",
                      row.mode === "combined"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-600",
                    )}
                  >
                    Total
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateRow(row.course.id, {
                        mode: "breakdown",
                      })
                    }
                    className={cn(
                      "px-3 py-2",
                      row.mode === "breakdown"
                        ? "bg-primary text-white"
                        : "bg-white text-gray-600",
                    )}
                  >
                    Breakdown
                  </button>
                </div>
              </div>

              {row.mode === "combined" ? (
                <div className="grid gap-1.5 max-w-[180px]">
                  <label className="text-sm font-medium">
                    Total Score (/100)
                  </label>
                  <input
                    type="number"
                    value={row.totalScore}
                    onChange={(e) =>
                      updateRow(row.course.id, {
                        totalScore: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg p-3 text-sm"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="grid gap-1.5">
                    <label className="text-sm font-medium">Test</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={row.testScore}
                        onChange={(e) =>
                          updateRow(row.course.id, {
                            testScore: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-lg p-3 text-sm flex-1"
                        placeholder="Score"
                      />
                      <input
                        type="number"
                        value={row.testMax}
                        onChange={(e) =>
                          updateRow(row.course.id, {
                            testMax: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-lg p-3 text-sm w-20"
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <label className="text-sm font-medium">Exam</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={row.examScore}
                        onChange={(e) =>
                          updateRow(row.course.id, {
                            examScore: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-lg p-3 text-sm flex-1"
                        placeholder="Score"
                      />
                      <input
                        type="number"
                        value={row.examMax}
                        onChange={(e) =>
                          updateRow(row.course.id, {
                            examMax: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-lg p-3 text-sm w-20"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                </div>
              )}

              {row.error && <p className="text-xs text-red-500">{row.error}</p>}
            </div>
          ))}
          <div className="rounded-xl border border-dashed border-gray-300 p-4 space-y-3">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <p>
                Uploading a departmental result slip or screenshot is optional
                and can help you keep a record.
              </p>
            </div>

            <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-700">
              <Upload className="h-4 w-4" />
              {attachment ?? "Attach PDF, JPG or PNG (max 10MB)"}
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) =>
                  setAttachment(e.target.files?.[0]?.name ?? null)
                }
              />
            </label>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <App_Button
              text="Cancel"
              btnStyle={SECONDARY_BUTTON}
              onClick={() => onOpenChange(false)}
            />
            <App_Button
              text="Review Results"
              btnStyle="bg-primary text-white"
              onClick={handleNext}
            />
          </div>
        </div>
      )}

      {step === "review" && (
        <div className="space-y-5">
          <App_Text type="cardhead" text="Review Results" />

          <div className="rounded-xl border border-gray-200 divide-y">
            {rows.map((row) => {
              const total = computeTotal({
                mode: row.mode,
                totalScore:
                  row.totalScore === "" ? undefined : Number(row.totalScore),
                testScore:
                  row.testScore === "" ? undefined : Number(row.testScore),
                examScore:
                  row.examScore === "" ? undefined : Number(row.examScore),
              });

              const grade = lookupGrade(total, grades);

              return (
                <div
                  key={row.course.id}
                  className="flex items-center justify-between p-4 text-sm"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {row.course.code}
                    </p>
                    <p className="text-gray-500">{row.course.title}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">{total.toFixed(1)}%</p>
                    <p
                      className={cn(
                        "font-semibold",
                        grade?.letter === "F"
                          ? "text-red-600"
                          : "text-green-600",
                      )}
                    >
                      {grade?.letter ?? "—"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between gap-2 pt-2">
            <App_Button
              text="Back"
              btnStyle={SECONDARY_BUTTON}
              onClick={() => setStep("scores")}
              disabled={saving}
            />

            <App_Button
              text={saving ? "Saving..." : "Save Results"}
              btnStyle="bg-primary text-white"
              onClick={handleSave}
              disabled={saving}
            />
          </div>
        </div>
      )}

      {step === "success" && (
        <div className="flex flex-col items-center text-center gap-3 py-4">
          <CheckCircle2 className="h-12 w-12 text-green-600" />

          <App_Text type="cardhead" text="Results Saved!" />

          <p className="text-sm text-gray-500">
            Your results for {semesterLabel} have been updated successfully.
          </p>

          <App_Button
            text="View Results"
            btnStyle="bg-primary text-white w-full"
            onClick={() => onOpenChange(false)}
          />
        </div>
      )}
    </App_Modal>
  );
};

export default EnterResultsDialog;
