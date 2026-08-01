"use client";

import { useState } from "react";

import { Plus } from "lucide-react";
import App_Button from "@/app/_components/app_ui/App_Button";
import App_Text from "@/app/_components/app_ui/App_Text";
import CoverageBar from "./grading_view_component/Coverage_Bar";
import GradeRowEditor from "./grading_view_component/Grade_Row_Editor";
import LockedView from "./grading_view_component/Locked_View";
import TemplateSelector from "./grading_view_component/Template_Selector";
import ValidationSummary from "./grading_view_component/Validation_Summary";
import { useGradingSystem } from "./grading_view_hooks/useGradingSystem";
import { getRowBounds, isRowMinValid } from "./grading_data/grading_data";

const GradingSystemPage = () => {
  const {
    template,
    scaleMax,
    setScaleMax,
    grades,
    applyTemplate,
    updateGrade,
    addGrade,
    removeGrade,
    errors,
    isValid,
    ranges,
    locked,
    saving,
    save,
    moveGrade,
  } = useGradingSystem();

  const [confirmOpen, setConfirmOpen] = useState(false);

  if (locked) {
    return (
      <div className="p-4 md:p-6 max-w-2xl mx-auto">
        <LockedView ranges={ranges} scaleMax={scaleMax} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-6">
      <div>
        <App_Text type="dashTitle" text="Set Up Your Grading System" />
        <p className="text-sm text-gray-500 mt-1">
          Choose a default scale or build your own. This is used across your
          GPA, CGPA and results — you'll want to get it right, since it locks
          once saved.
        </p>
      </div>

      <TemplateSelector value={template} onChange={applyTemplate} />

      {template === "custom" && (
        <div className="grid gap-1 max-w-xs">
          <label className="text-sm font-medium">Scale Max</label>
          <input
            type="number"
            step="0.1"
            value={scaleMax}
            onChange={(e) => setScaleMax(Number(e.target.value))}
            className="border rounded-md p-2 text-sm"
          />
        </div>
      )}

      <div className="space-y-3">
        {grades.map((row, index) => (
          <GradeRowEditor
            key={row.id}
            row={row}
            computedMax={ranges.find((r) => r.id === row.id)?.max}
            bounds={getRowBounds(grades, index, scaleMax)}
            isLast={index === grades.length - 1}
            minIsValid={isRowMinValid(grades, index, scaleMax)}
            onChange={(patch) => updateGrade(row.id, patch)}
            onRemove={() => removeGrade(row.id)}
            onMoveUp={() => moveGrade(row.id, "up")}
            onMoveDown={() => moveGrade(row.id, "down")}
            canMoveUp={index > 0}
            canMoveDown={index < grades.length - 1}
            removeDisabled={grades.length <= 1}
          />
        ))}
        <App_Button
          text="Add Grade"
          icon={<Plus className="h-4 w-4" />}
          btnStyle="bg-white border text-primary hover:bg-primary/5"
          onClick={addGrade}
        />
      </div>

      <div className="rounded-xl border bg-white p-4 space-y-3">
        <App_Text type="dashSub" text="Preview" />
        <CoverageBar ranges={ranges} scaleMax={scaleMax} />
        <ValidationSummary errors={errors} scaleMax={scaleMax} />
      </div>

      <div className="flex justify-end">
        <App_Button
          text={saving ? "Saving..." : "Save & Lock Grading System"}
          btnStyle="bg-primary text-white"
          disabled={!isValid || saving}
          onClick={() => setConfirmOpen(true)}
        />
      </div>

      {/* <ConfirmDialog
        open={confirmOpen}
        title="Save Grading System?"
        description="Once saved, this grading system will be locked and used across your GPA, CGPA and results. You'll need to contact support to change it later."
        confirmText="Save & Lock"
        destructive={false}
        onOpenChange={setConfirmOpen}
        onConfirm={save}
      /> */}
    </div>
  );
};

export default GradingSystemPage;
