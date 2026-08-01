"use client";

import { cn } from "@/lib/utils";
import { ScaleTemplate } from "../grading_types";

const OPTIONS: { key: ScaleTemplate; label: string; desc: string }[] = [
  { key: "5.0", label: "5.0 Scale", desc: "Standard 5-point default" },
  { key: "4.0", label: "4.0 Scale", desc: "Standard 4-point default" },
  { key: "custom", label: "Custom", desc: "Build your own from scratch" },
];

const TemplateSelector = ({
  value,
  onChange,
}: {
  value: ScaleTemplate;
  onChange: (t: ScaleTemplate) => void;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {OPTIONS.map((opt) => (
        <button
          key={opt.key}
          type="button"
          onClick={() => onChange(opt.key)}
          className={cn(
            "text-left rounded-xl border p-4 transition-colors",
            value === opt.key
              ? "border-primary bg-primary/5 ring-1 ring-primary"
              : "hover:bg-gray-50",
          )}
        >
          <p className="font-semibold">{opt.label}</p>
          <p className="text-sm text-gray-500">{opt.desc}</p>
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
