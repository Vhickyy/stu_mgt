"use client";

import App_Button from "@/app/_components/app_ui/App_Button";
import App_Modal from "@/app/_components/app_ui/App_Modal";
import App_Switch from "@/app/_components/app_ui/App_Switch";
import App_Text from "@/app/_components/app_ui/App_Text";
import { useEffect, useState } from "react";
import { AcademicSession } from "../academic_types";

interface EditSessionDialogProps {
  session: AcademicSession | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSetActive: (sessionId: string) => Promise<void>;
}

const SECONDARY_BUTTON = "bg-white border text-gray-700 hover:bg-gray-50";

const EditSessionDialog = ({
  session,
  open,
  onOpenChange,
  onSetActive,
}: EditSessionDialogProps) => {
  const [isActive, setIsActive] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open && session) {
      setIsActive(session.isActive);
      setSaving(false);
    }
  }, [open, session]);

  if (!open || !session) return null;

  const handleSave = async () => {
    setSaving(true);

    try {
      if (isActive && !session.isActive) {
        await onSetActive(session.id);
      }

      onOpenChange(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <App_Modal onClose={() => onOpenChange(false)} text="Edit Session">
      {" "}
      <div className="space-y-5">
        <App_Text type="cardhead" text={`Edit ${session.name}`} />
        ```
        <div className="rounded-xl border border-gray-200 p-4 bg-gray-50 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Start Year</span>
            <span className="font-medium text-gray-900">
              {session.startYear}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">End Year</span>
            <span className="font-medium text-gray-900">{session.endYear}</span>
          </div>

          <p className="text-xs text-gray-500 pt-2 border-t border-gray-200">
            Session years cannot be edited once semesters or courses have been
            created under this session.
          </p>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-900">Active session</p>
            <p className="text-xs text-gray-500">
              Only one academic session can be active at a time.
            </p>
          </div>

          <App_Switch val={isActive} setVal={setIsActive} />
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <App_Button
            text="Cancel"
            btnStyle={SECONDARY_BUTTON}
            onClick={() => onOpenChange(false)}
          />

          <App_Button
            text={saving ? "Saving..." : "Save Changes"}
            btnStyle="bg-primary text-white"
            onClick={handleSave}
            disabled={saving}
          />
        </div>
      </div>
    </App_Modal>
  );
};

export default EditSessionDialog;
