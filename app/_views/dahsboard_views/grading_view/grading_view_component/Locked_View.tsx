"use client";
import App_Text from "@/app/_components/app_ui/App_Text";
import { Lock } from "lucide-react";
import { RangedGrade } from "../grading_types";
import CoverageBar from "./Coverage_Bar";

const LockedView = ({
  ranges,
  scaleMax,
}: {
  ranges: RangedGrade[];
  scaleMax: number;
}) => {
  return (
    <div className="rounded-xl border bg-white p-5 space-y-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          <Lock className="h-3 w-3" /> Locked
        </span>
      </div>
      <App_Text
        type="cardhead"
        text={`Your Grading System (0 – ${scaleMax})`}
      />
      <CoverageBar ranges={ranges} scaleMax={scaleMax} />
      <div className="grid gap-2">
        {ranges.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between text-sm border-b pb-2 last:border-0"
          >
            <span className="font-medium">{r.letter}</span>
            <span className="text-gray-500">
              {r.min.toFixed(2)} – {r.max.toFixed(2)}
            </span>
            <span className="text-gray-500">{r.points.toFixed(1)} pts</span>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        Your grading system is locked and used across your GPA, CGPA and
        results. To change it, please contact support.
      </p>
    </div>
  );
};

export default LockedView;
