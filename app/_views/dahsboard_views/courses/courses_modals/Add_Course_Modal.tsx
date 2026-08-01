"use client";

import { useEffect, useState } from "react";

import { CheckCircle2, Info } from "lucide-react";
import App_Button from "@/app/_components/app_ui/App_Button";
import App_Modal from "@/app/_components/app_ui/App_Modal";
import App_Select from "@/app/_components/app_ui/App_Select";
import App_Text from "@/app/_components/app_ui/App_Text";
import { cn } from "@/lib/utils";
import { type } from "os";
import { title } from "process";
import {
  isDuplicateCourseCode,
  creditHourCapError,
} from "../courses_data/course-validation";
import { Course, CourseType } from "../courses_types";

type Step = "details" | "credit" | "confirm" | "success";

interface AddCourseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  semesterId: string;
  allCourses: Course[];
  onSave: (input: Omit<Course, "id">) => Promise<void>;
  editingCourse?: Course | null;
}

const TYPE_OPTIONS = [
  { label: "Core", key: "Core" },
  { label: "Elective", key: "Elective" },
];

const CREDIT_OPTIONS = [1, 2, 3, 4, 5, 6].map((n) => ({
  label: String(n),
  key: String(n),
}));

const SECONDARY_BUTTON = "bg-white border text-gray-700 hover:bg-gray-50";

const AddCourseDialog = ({
  open,
  onOpenChange,
  semesterId,
  allCourses,
  onSave,
  editingCourse,
}: AddCourseDialogProps) => {
  const [step, setStep] = useState<Step>("details");
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [creditHours, setCreditHours] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const isEdit = Boolean(editingCourse);

  const resetState = () => {
    setStep("details");
    setCode(editingCourse?.code ?? "");
    setTitle(editingCourse?.title ?? "");
    setType(editingCourse?.type ?? "");
    setCreditHours(editingCourse ? String(editingCourse.creditHours) : "");
    setErrors({});
    setSaving(false);
  };

  useEffect(() => {
    if (open) resetState();
  }, [open, editingCourse]);

  const validateDetails = () => {
    const next: Record<string, string> = {};

    if (!code.trim()) {
      next.code = "Course code is required";
    } else if (
      isDuplicateCourseCode(code, semesterId, allCourses, editingCourse?.id)
    ) {
      next.code = "This course code is already registered this semester";
    }

    if (!title.trim()) next.title = "Course title is required";
    if (!type) next.type = "Select a course type";

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateCredit = () => {
    if (!creditHours) {
      setErrors({
        creditHours: "Select credit hours",
      });
      return false;
    }

    const capError = creditHourCapError(
      Number(creditHours),
      semesterId,
      allCourses,
      editingCourse?.id,
    );

    if (capError) {
      setErrors({ creditHours: capError });
      return false;
    }

    setErrors({});
    return true;
  };

  const handleSave = async () => {
    if (!validateCredit()) return;

    setSaving(true);

    try {
      await onSave({
        semesterId,
        code: code.trim().toUpperCase(),
        title: title.trim(),
        creditHours: Number(creditHours),
        type: type as CourseType,
      });

      if (isEdit) {
        onOpenChange(false);
      } else {
        setStep("success");
      }
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <App_Modal
      onClose={() => onOpenChange(false)}
      text={isEdit ? "Edit Course" : "Add Course"}
    >
      {step === "details" && (
        <div className="space-y-5">
          <App_Text
            type="cardhead"
            text={isEdit ? "Edit Course" : "Add Course"}
          />

          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <label className="text-sm font-medium">Course Code</label>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. CSC 402"
                className={cn(
                  "border border-gray-300 rounded-lg p-3 text-sm",
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
                  "border border-gray-300 rounded-lg p-3 text-sm",
                  errors.title && "border-red-500",
                )}
                maxLength={80}
              />
              {errors.title && (
                <span className="text-xs text-red-500">{errors.title}</span>
              )}
            </div>

            <App_Select
              title="Course Type"
              data={TYPE_OPTIONS}
              value={type}
              placeholder="Select course type"
              onChange={setType}
            />

            {errors.type && (
              <span className="text-xs text-red-500 -mt-3">{errors.type}</span>
            )}

            <p className="text-xs text-gray-500">
              Core courses are required for your program, while electives are
              optional courses that contribute to your credit load.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <App_Button
              text="Cancel"
              btnStyle={SECONDARY_BUTTON}
              onClick={() => onOpenChange(false)}
            />

            <App_Button
              text="Next"
              btnStyle="bg-primary text-white"
              onClick={() => validateDetails() && setStep("credit")}
            />
          </div>
        </div>
      )}

      {step === "credit" && (
        <div className="space-y-5">
          <App_Text type="cardhead" text="Set Credit Hours" />

          <App_Select
            title="Credit Hours"
            data={CREDIT_OPTIONS}
            value={creditHours}
            placeholder="Select credit hours"
            onChange={setCreditHours}
          />

          {errors.creditHours && (
            <span className="text-xs text-red-500">{errors.creditHours}</span>
          )}

          <div className="flex items-start gap-3 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
            <Info className="h-5 w-5 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium">Credit hour guidance</p>
              <p>
                Most university courses are between 1 and 4 credit hours. Your
                semester credit limit will be checked automatically.
              </p>
            </div>
          </div>

          <div className="flex justify-between gap-2 pt-2">
            <App_Button
              text="Back"
              btnStyle={SECONDARY_BUTTON}
              onClick={() => setStep("details")}
            />

            <App_Button
              text="Next"
              btnStyle="bg-primary text-white"
              onClick={() => validateCredit() && setStep("confirm")}
            />
          </div>
        </div>
      )}

      {step === "confirm" && (
        <div className="space-y-5">
          <App_Text type="cardhead" text="Confirm Course" />

          <div className="rounded-xl border border-gray-200 p-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Course Code</span>
              <span className="font-medium">{code.toUpperCase()}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Course Title</span>
              <span className="font-medium text-right max-w-[180px]">
                {title}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Course Type</span>
              <span className="font-medium">{type}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Credit Hours</span>
              <span className="font-medium">{creditHours}</span>
            </div>
          </div>

          <div className="flex justify-between gap-2 pt-2">
            <App_Button
              text="Back"
              btnStyle={SECONDARY_BUTTON}
              onClick={() => setStep("credit")}
              disabled={saving}
            />

            <App_Button
              text={
                saving ? "Saving..." : isEdit ? "Save Changes" : "Save Course"
              }
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

          <App_Text type="cardhead" text="Course Added Successfully!" />

          <p className="text-sm text-gray-500">
            {code.toUpperCase()} — {title} has been added to your semester.
          </p>

          <App_Button
            text="View Courses"
            btnStyle="bg-primary text-white w-full"
            onClick={() => onOpenChange(false)}
          />
        </div>
      )}
    </App_Modal>
  );
};

export default AddCourseDialog;
