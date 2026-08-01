"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import App_Button from "@/app/_components/app_ui/App_Button";
import App_Modal from "@/app/_components/app_ui/App_Modal";
import App_Select from "@/app/_components/app_ui/App_Select";
import App_Text from "@/app/_components/app_ui/App_Text";
import { cn } from "@/lib/utils";
import { GRADE_SCALES } from "../gpa_data/gpa_data";
import { ScaleType, ICourse } from "../gpa_types";

type Step = "details" | "grade" | "success";

interface AddCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scale: ScaleType;
  onSave: (course: Omit<ICourse, "id">) => void;
  isDuplicate: (code: string) => boolean;
  editingCourse?: ICourse | null;
}

const CREDIT_OPTIONS = [1, 2, 3, 4, 5, 6].map((n) => ({
  label: String(n),
  key: String(n),
}));

const AddCourseDialog = ({
  open,
  onOpenChange,
  scale,
  onSave,
  isDuplicate,
  editingCourse,
}: AddCourseDialogProps) => {
  const [step, setStep] = useState<Step>("details");
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [creditUnits, setCreditUnits] = useState("3");
  const [grade, setGrade] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const isEdit = Boolean(editingCourse);

  useEffect(() => {
    if (!open) return;

    setStep("details");
    setCode(editingCourse?.code ?? "");
    setTitle(editingCourse?.title ?? "");
    setCreditUnits(String(editingCourse?.creditUnits ?? 3));
    setGrade(editingCourse?.grade ?? "");
    setErrors({});
    setSaving(false);
  }, [open, editingCourse]);

  const validateDetails = () => {
    const next: Record<string, string> = {};

    if (!code.trim()) next.code = "Course code is required";
    else if (!isEdit && isDuplicate(code))
      next.code = "This course code is already added this semester";

    if (!title.trim()) next.title = "Course title is required";
    if (!creditUnits || Number(creditUnits) <= 0)
      next.creditUnits = "Select credit units";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (validateDetails()) setStep("grade");
  };

  const handleAddCourse = async () => {
    if (!grade) {
      setErrors({ grade: "Select a grade to continue" });
      return;
    }

    setSaving(true);
    await new Promise((r) => setTimeout(r, 300));

    onSave({
      code: code.trim().toUpperCase(),
      title: title.trim(),
      creditUnits: Number(creditUnits),
      grade,
    });

    setSaving(false);

    if (isEdit) {
      onOpenChange(false);
    } else {
      setStep("success");
    }
  };

  const handleAddAnother = () => {
    setStep("details");
    setCode("");
    setTitle("");
    setCreditUnits("3");
    setGrade("");
    setErrors({});
  };

  if (!open) return null;

  return (
    <App_Modal
      onClose={() => onOpenChange(false)}
      text={isEdit ? "Edit Course" : "Add Course"}
    >
      {step === "details" && (
        <>
          <App_Text
            text={isEdit ? "Edit course" : "Add course"}
            type="dashTitle"
          />

          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <label className="text-sm font-medium">Course Code</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. CSC 402"
                className={cn(
                  "border rounded-md p-2 text-sm",
                  errors.code && "border-red-500",
                )}
                maxLength={12}
              />
              {errors.code && (
                <span className="text-xs text-red-500">{errors.code}</span>
              )}
            </div>

            <div className="grid gap-1.5">
              <label className="text-sm font-medium">Course Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Software Engineering"
                className={cn(
                  "border rounded-md p-2 text-sm",
                  errors.title && "border-red-500",
                )}
                maxLength={80}
              />
              {errors.title && (
                <span className="text-xs text-red-500">{errors.title}</span>
              )}
            </div>

            <App_Select
              title="Credit Units"
              data={CREDIT_OPTIONS}
              value={creditUnits}
              placeholder="Select credit units"
              onChange={setCreditUnits}
            />

            {errors.creditUnits && (
              <span className="text-xs text-red-500 -mt-3">
                {errors.creditUnits}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <App_Button
              text="Cancel"
              btnStyle="bg-white border text-gray-700 hover:bg-gray-50"
              onClick={() => onOpenChange(false)}
            />
            <App_Button
              text="Next"
              btnStyle="bg-primary text-white"
              onClick={handleNext}
            />
          </div>
        </>
      )}

      {step === "grade" && (
        <>
          <App_Text
            text={isEdit ? "Edit course" : "Add course"}
            type="dashTitle"
          />

          <div className="grid gap-3">
            <App_Text type="dashText" text={`Grade Scale (\${scale})`} />

            <div className="grid grid-cols-2 gap-2">
              {GRADE_SCALES[scale].map((g) => (
                <button
                  key={g.grade}
                  type="button"
                  onClick={() => setGrade(g.grade)}
                  className={cn(
                    "flex items-center justify-between rounded-md border px-3 py-2 text-sm",
                    grade === g.grade
                      ? "border-primary bg-primary/10 font-semibold"
                      : "hover:bg-gray-50",
                  )}
                >
                  <span>{g.grade}</span>
                  <span className="text-xs text-gray-500">{g.range}</span>
                </button>
              ))}
            </div>

            {errors.grade && (
              <span className="text-xs text-red-500">{errors.grade}</span>
            )}
          </div>

          <div className="flex justify-between gap-2 pt-2">
            <App_Button
              text="Back"
              btnStyle="bg-white border text-gray-700 hover:bg-gray-50"
              onClick={() => setStep("details")}
            />
            <App_Button
              text={
                saving ? "Adding..." : isEdit ? "Save Changes" : "Add Course"
              }
              btnStyle="bg-green-600 text-white"
              onClick={handleAddCourse}
              disabled={saving}
            />
          </div>
        </>
      )}

      {step === "success" && (
        <div className="flex flex-col items-center text-center gap-3 py-4">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
          <App_Text type="cardhead" text="Course Added!" />
          <p className="text-sm text-gray-500">
            {code.toUpperCase()} - {title} has been added successfully.
          </p>

          <div className="flex w-full flex-col gap-2 pt-2">
            <App_Button
              text="Add Another"
              btnStyle="bg-white border text-primary hover:bg-primary/5 w-full"
              onClick={handleAddAnother}
            />
            <App_Button
              text="Done"
              btnStyle="bg-primary text-white w-full"
              onClick={() => onOpenChange(false)}
            />
          </div>
        </div>
      )}
    </App_Modal>
  );
};

export default AddCourseDialog;
