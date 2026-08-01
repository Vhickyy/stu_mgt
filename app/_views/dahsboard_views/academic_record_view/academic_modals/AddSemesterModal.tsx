"use client";

import App_Button from "@/app/_components/app_ui/App_Button";
import App_Modal from "@/app/_components/app_ui/App_Modal";
import App_Text from "@/app/_components/app_ui/App_Text";
import { useEffect, useState } from "react";
import { validateSemesterDates } from "../academic_data/academic_data";
import { AcademicSession, Semester } from "../academic_types";

interface AddSemesterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: AcademicSession | null;
  existingInSession: Semester[];
  onSave: (input: {
    sessionId: string;
    name: string;
    startDate: string;
    endDate: string;
  }) => Promise<void>;
}

const SECONDARY_BUTTON = "bg-white border text-gray-700 hover:bg-gray-50";

const AddSemesterDialog = ({
  open,
  onOpenChange,
  session,
  existingInSession,
  onSave,
}: AddSemesterDialogProps) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const resetState = () => {
    setName(`Semester ${existingInSession.length + 1}`);
    setStartDate("");
    setEndDate("");
    setError(null);
    setSaving(false);
  };

  useEffect(() => {
    if (open) resetState();
  }, [open, existingInSession.length]);

  if (!open || !session) return null;

  const handleSave = async () => {
    const validationError = validateSemesterDates(
      { startDate, endDate },
      session,
      existingInSession,
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setSaving(true);

    try {
      await onSave({
        sessionId: session.id,
        name,
        startDate,
        endDate,
      });

      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <App_Modal onClose={() => onOpenChange(false)} text="Add Semester">
      {" "}
      <div className="space-y-5">
        <App_Text type="cardhead" text="Add Semester" />

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
          <p className="text-sm text-gray-500">Academic Session</p>
          <p className="font-semibold text-gray-900">{session.name}</p>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <label className="text-sm font-medium">Semester Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. First Semester"
              className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <label className="text-sm font-medium">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div className="grid gap-1.5">
              <label className="text-sm font-medium">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <App_Button
            text="Cancel"
            btnStyle={SECONDARY_BUTTON}
            onClick={() => onOpenChange(false)}
          />

          <App_Button
            text={saving ? "Saving..." : "Add Semester"}
            btnStyle="bg-primary text-white"
            onClick={handleSave}
            disabled={saving || !name.trim() || !startDate || !endDate}
          />
        </div>
      </div>
    </App_Modal>
  );
};

export default AddSemesterDialog;
