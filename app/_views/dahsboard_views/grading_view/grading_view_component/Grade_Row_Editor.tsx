"use client";

import { Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { RowBounds } from "../grading_data/grading_data";
import { GradeRow } from "../grading_types";

interface GradeRowEditorProps {
  row: GradeRow;
  computedMax: number | undefined;
  bounds: RowBounds;
  isLast: boolean;
  minIsValid: boolean;
  onChange: (patch: Partial<Omit<GradeRow, "id">>) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  removeDisabled: boolean;
}

const GradeRowEditor = ({
  row,
  computedMax,
  bounds,
  isLast,
  minIsValid,
  onChange,
  onRemove,
  onMoveUp,
  onMoveDown,
  canMoveUp,
  canMoveDown,
  removeDisabled,
}: GradeRowEditorProps) => {
  return (
    <div className="rounded-lg border p-3 space-y-2">
      <div className="grid grid-cols-2 sm:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-2 items-start">
        <div className="grid gap-1">
          <label className="text-xs text-gray-500">Letter</label>
          <input
            value={row.letter}
            onChange={(e) => onChange({ letter: e.target.value.toUpperCase() })}
            maxLength={3}
            className="border rounded-md p-2 text-sm"
            placeholder="A"
          />
        </div>
        <div className="grid gap-1">
          <label className="text-xs text-gray-500">Points</label>
          <input
            type="number"
            step="0.1"
            value={row.points}
            onChange={(e) => onChange({ points: Number(e.target.value) })}
            className="border rounded-md p-2 text-sm"
          />
        </div>
        <div className="grid gap-1">
          <label className="text-xs text-gray-500">Min score</label>
          <input
            type="number"
            step="0.01"
            value={row.min}
            disabled={isLast}
            onChange={(e) => onChange({ min: Number(e.target.value) })}
            className={cn(
              "border rounded-md p-2 text-sm",
              isLast && "bg-gray-50 text-gray-500",
              !isLast && !minIsValid && "border-red-500 bg-red-50",
            )}
          />
          {!isLast && (
            <span
              className={cn(
                "text-[11px]",
                minIsValid ? "text-gray-400" : "text-red-500",
              )}
            >
              Must be {">"} {bounds.floor.toFixed(2)} and {"<"}{" "}
              {bounds.ceiling.toFixed(2)}
            </span>
          )}
          {isLast && (
            <span className="text-[11px] text-gray-400">
              Locked at 0 to cover the full scale
            </span>
          )}
        </div>
        <div className="grid gap-1">
          <label className="text-xs text-gray-500">Max (auto)</label>
          <div className="border rounded-md p-2 text-sm bg-gray-50 text-gray-500">
            {computedMax !== undefined ? computedMax.toFixed(2) : "—"}
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 justify-self-end sm:justify-self-auto">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            aria-label="Move up"
            className="text-gray-400 hover:text-primary disabled:opacity-20"
          >
            <ChevronUp className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onRemove}
            disabled={removeDisabled}
            aria-label="Remove grade"
            className="text-gray-400 hover:text-red-600 disabled:opacity-30"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            aria-label="Move down"
            className="text-gray-400 hover:text-primary disabled:opacity-20"
          >
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradeRowEditor;
