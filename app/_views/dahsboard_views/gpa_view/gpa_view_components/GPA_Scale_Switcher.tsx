"use client";

import { cn } from "@/lib/utils";
import { ScaleType } from "../gpa_types";

const SCALES: ScaleType[] = ["5.0", "4.0"];

const GpaScaleSwitcher = ({
  value,
  onChange,
}: {
  value: ScaleType;
  onChange: (scale: ScaleType) => void;
}) => {
  return (
    <div
      role="radiogroup"
      aria-label="Grading scale"
      className="flex rounded-md border overflow-hidden text-sm font-medium"
    >
      {SCALES.map((s) => (
        <button
          key={s}
          type="button"
          role="radio"
          aria-checked={value === s}
          onClick={() => onChange(s)}
          className={cn(
            "px-4 py-2 transition-colors cursor-pointer",
            value === s
              ? "bg-primary text-white"
              : "bg-white text-gray-600 hover:bg-gray-50",
          )}
        >
          {s} Scale
        </button>
      ))}
    </div>
  );
};

export default GpaScaleSwitcher;
