"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Pencil, Trash2, FileQuestion } from "lucide-react";
import App_Text from "@/app/_components/app_ui/App_Text";
import App_Table from "@/app/_components/shared/App_Table";
import {
  CourseResultRow,
  computeSemesterGPA,
} from "../results_data/results-computation";

const CourseResultsTable = ({
  rows,
  pointScaleMax,
  onEdit,
  onDelete,
}: {
  rows: CourseResultRow[];
  pointScaleMax: number;
  onEdit: (row: CourseResultRow) => void;
  onDelete: (row: CourseResultRow) => void;
}) => {
  const { totalCreditUnits, totalPoints, gpa, isComplete } =
    computeSemesterGPA(rows);

  const columns: ColumnDef<CourseResultRow>[] = [
    { header: "#", cell: ({ row }) => row.index + 1 },
    { header: "Course Code", cell: ({ row }) => row.original.course.code },
    {
      header: "Course Title",
      cell: ({ row }) => (
        <span
          className="block max-w-[160px] truncate md:max-w-xs"
          title={row.original.course.title}
        >
          {row.original.course.title}
        </span>
      ),
    },
    {
      header: "Credit Units",
      cell: ({ row }) => row.original.course.creditHours,
    },
    {
      header: "Grade",
      cell: ({ row }) =>
        row.original.letter ? (
          <span
            className={cn(
              row.original.letter === "F"
                ? "text-red-600"
                : row.original.letter.startsWith("A")
                  ? "text-green-600"
                  : "text-gray-700",
            )}
          >
            {row.original.letter}
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs text-amber-600">
            <FileQuestion className="h-3.5 w-3.5" /> Pending
          </span>
        ),
    },
    {
      header: "Grade Point",
      cell: ({ row }) =>
        row.original.points !== null ? row.original.points.toFixed(1) : "—",
    },
    {
      header: "Points Earned",
      cell: ({ row }) =>
        row.original.pointsEarned !== null
          ? row.original.pointsEarned.toFixed(1)
          : "—",
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <button
            aria-label="Edit result"
            onClick={() => onEdit(row.original)}
            className="text-gray-500 hover:text-primary"
          >
            <Pencil className="h-4 w-4" />
          </button>
          {row.original.result && (
            <button
              aria-label="Delete result"
              onClick={() => onDelete(row.original)}
              className="text-gray-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-4">
      <App_Text type="cardhead" text="Course Results" />
      {rows.length === 0 ? (
        <p className="text-sm text-gray-500 py-8 text-center">
          No courses registered for this semester.
        </p>
      ) : (
        <div className="overflow-x-auto mt-2">
          <App_Table columns={columns} data={rows} />
          <div className="mt-3 flex items-center justify-between rounded-md bg-primary/5 px-4 py-3 text-sm font-semibold">
            <span>Total</span>
            <span>{totalCreditUnits}</span>
            <span>{totalPoints.toFixed(1)}</span>
            <span className="rounded-md bg-primary/10 text-primary px-2 py-1">
              GPA:{" "}
              {isComplete
                ? `${gpa.toFixed(2)} / ${pointScaleMax.toFixed(2)}`
                : "Incomplete"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseResultsTable;
