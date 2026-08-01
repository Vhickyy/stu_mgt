"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Info } from "lucide-react";
import App_Button from "@/app/_components/app_ui/App_Button";
import App_Modal from "@/app/_components/app_ui/App_Modal";
import App_Select from "@/app/_components/app_ui/App_Select";
import App_Text from "@/app/_components/app_ui/App_Text";
import { cn } from "@/lib/utils";
import { validateNewSessionYear } from "../academic_data/academic_data";
import { AcademicSession } from "../academic_types";

type Step = "details" | "semesters" | "confirm" | "success";

interface CreateSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  existingSessions: AcademicSession[];
  onCreate: (input: {
    startYear: number;
    intendedSemesterCount: number;
  }) => Promise<void>;
  onGoToSession: () => void;
}

const currentYear = new Date().getFullYear();

const YEAR_OPTIONS = Array.from(
  { length: 8 },
  (_, i) => currentYear + 2 - i,
).map((y) => ({
  label: String(y),
  key: String(y),
}));

const SEMESTER_OPTIONS: Array<1 | 2 | 3> = [1, 2, 3];

const SECONDARY_BUTTON = "bg-white border text-gray-700 hover:bg-gray-50";

const CreateSessionDialog = ({
  open,
  onOpenChange,
  existingSessions,
  onCreate,
  onGoToSession,
}: CreateSessionDialogProps) => {
  const [step, setStep] = useState<Step>("details");
  const [startYear, setStartYear] = useState("");
  const [semesterCount, setSemesterCount] = useState<1 | 2 | 3>(2);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const endYear = startYear ? Number(startYear) + 1 : null;

  const resetState = () => {
    setStep("details");
    setStartYear("");
    setSemesterCount(2);
    setError(null);
    setSaving(false);
  };

  useEffect(() => {
    if (open) resetState();
  }, [open]);

  const handleNextFromDetails = () => {
    const err = validateNewSessionYear(Number(startYear), existingSessions);

    if (err) {
      setError(err);
      return;
    }

    setError(null);
    setStep("semesters");
  };

  const handleCreate = async () => {
    setSaving(true);

    await onCreate({
      startYear: Number(startYear),
      intendedSemesterCount: semesterCount,
    });

    setSaving(false);
    setStep("success");
  };

  if (!open) return null;

  return (
    <App_Modal onClose={() => onOpenChange(false)} text="Create Session">
      {step === "details" && (
        <>
          <App_Text type="cardhead" text="Session Details" />
          ```
          <div className="grid grid-cols-2 gap-3 py-2">
            <App_Select
              title="Start Year"
              data={YEAR_OPTIONS}
              value={startYear}
              placeholder="Select year"
              onChange={setStartYear}
            />

            <div className="grid gap-1">
              <label className="text-sm font-medium">End Year</label>

              <div className="border rounded-md p-2 text-sm bg-gray-50 text-gray-500">
                {endYear ?? "—"}
              </div>
            </div>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex justify-end gap-2 pt-2">
            <App_Button
              text="Cancel"
              btnStyle={SECONDARY_BUTTON}
              onClick={() => onOpenChange(false)}
            />

            <App_Button
              text="Next"
              btnStyle="bg-primary text-white"
              onClick={handleNextFromDetails}
              disabled={!startYear}
            />
          </div>
        </>
      )}

      {step === "semesters" && (
        <>
          <App_Text type="cardhead" text="Add Semesters" />

          <p className="text-sm text-gray-500 py-1">
            How many semesters are in this session?
          </p>

          <div className="grid gap-2 py-2">
            {SEMESTER_OPTIONS.map((count) => (
              <label
                key={count}
                className={cn(
                  "flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition-colors",
                  semesterCount === count
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300",
                )}
              >
                <input
                  type="radio"
                  checked={semesterCount === count}
                  onChange={() => setSemesterCount(count)}
                />

                <span className="font-medium">
                  {count} Semester{count > 1 ? "s" : ""}
                </span>
              </label>
            ))}
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
              onClick={() => setStep("confirm")}
            />
          </div>
        </>
      )}

      {step === "confirm" && (
        <>
          <App_Text type="cardhead" text="Confirm Session" />

          <div className="grid gap-3 py-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Session Name</span>

              <span className="font-medium">
                {startYear}/{endYear}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Start Year</span>

              <span className="font-medium">{startYear}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">End Year</span>

              <span className="font-medium">{endYear}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Intended Semesters</span>

              <span className="font-medium">{semesterCount}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 rounded-xl bg-blue-50 p-3 text-sm text-blue-700">
            <Info className="h-4 w-4 mt-0.5 shrink-0" />
            You can add semesters and courses after creating the session.
          </div>

          <div className="flex justify-between gap-2 pt-2">
            <App_Button
              text="Back"
              btnStyle={SECONDARY_BUTTON}
              onClick={() => setStep("semesters")}
              disabled={saving}
            />

            <App_Button
              text={saving ? "Creating..." : "Create Session"}
              btnStyle="bg-primary text-white"
              onClick={handleCreate}
              disabled={saving}
            />
          </div>
        </>
      )}

      {step === "success" && (
        <div className="flex flex-col items-center text-center gap-3 py-4">
          <CheckCircle2 className="h-12 w-12 text-green-600" />

          <App_Text type="cardhead" text="Session Created!" />

          <p className="text-sm text-gray-500">
            {startYear}/{endYear} session has been created successfully.
          </p>

          <App_Button
            text="Go to Session"
            btnStyle="bg-primary text-white w-full"
            onClick={() => {
              onGoToSession();
              onOpenChange(false);
            }}
          />
        </div>
      )}
    </App_Modal>
  );
};

export default CreateSessionDialog;
