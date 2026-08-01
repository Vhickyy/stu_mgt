"use client";

import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Pencil, Trash2, Eye, Plus, Star } from "lucide-react";
import App_Button from "@/app/_components/app_ui/App_Button";
import App_Select from "@/app/_components/app_ui/App_Select";
import App_Text from "@/app/_components/app_ui/App_Text";
import App_Table from "@/app/_components/shared/App_Table";
import { AcademicSession, Semester } from "../academic_types";
import { TableSkeleton } from "./Academic_Skeleton";

const STATUS_FILTERS = [
  { label: "All Semesters", key: "all" },
  { label: "Current", key: "current" },
  { label: "Completed", key: "completed" },
];

interface SemestersPanelProps {
  session: AcademicSession | null;
  semesters: Semester[];
  isLoading: boolean;
  onAdd: () => void;
  onEdit: (semester: Semester) => void;
  onDelete: (semester: Semester) => void;
  onSetCurrent: (semester: Semester) => void;
}

const SemestersPanel = ({
  session,
  semesters,
  isLoading,
  onAdd,
  onEdit,
  onDelete,
  onSetCurrent,
}: SemestersPanelProps) => {
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    if (statusFilter === "all") return semesters;
    if (statusFilter === "current") return semesters.filter((s) => s.isCurrent);
    return semesters.filter((s) => !s.isCurrent);
  }, [semesters, statusFilter]);

  const columns: ColumnDef<Semester>[] = [
    { header: "#", cell: ({ row }) => row.index + 1 },
    { accessorKey: "name", header: "Semester" },
    {
      header: "Period",
      cell: ({ row }) =>
        `${new Date(row.original.startDate).toLocaleDateString(undefined, { month: "short", year: "numeric" })} - ${new Date(
          row.original.endDate,
        ).toLocaleDateString(undefined, { month: "short", year: "numeric" })}`,
    },
    { accessorKey: "totalCourses", header: "Courses" },
    { accessorKey: "totalCreditHours", header: "Credit Hours" },
    {
      header: "Status",
      cell: ({ row }) => (
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-medium",
            row.original.isCurrent
              ? "bg-green-100 text-green-700"
              : "bg-blue-50 text-blue-600",
          )}
        >
          {row.original.isCurrent ? "Current" : "Completed"}
        </span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          {!row.original.isCurrent && (
            <button
              aria-label="Set as current semester"
              onClick={() => onSetCurrent(row.original)}
              className="text-gray-400 hover:text-amber-500"
              title="Set as current"
            >
              <Star className="h-4 w-4" />
            </button>
          )}
          <button
            aria-label="Edit semester"
            onClick={() => onEdit(row.original)}
            className="text-gray-500 hover:text-primary"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            aria-label="Delete semester"
            onClick={() => onDelete(row.original)}
            className="text-gray-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <TableSkeleton rows={2} />;

  if (!session) {
    return (
      <div className="rounded-xl border bg-white p-4">
        <p className="text-sm text-gray-500 py-8 text-center">
          Select a session above to view its semesters.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <App_Text type="cardhead" text={`Semesters in ${session.name}`} />
          <span className="rounded-full bg-primary/10 text-primary text-xs font-medium px-2 py-0.5">
            {semesters.length}{" "}
            {semesters.length === 1 ? "Semester" : "Semesters"}
          </span>
        </div>
        <App_Select
          data={STATUS_FILTERS}
          value={statusFilter}
          placeholder="Filter"
          onChange={setStatusFilter}
          style="w-40"
        />
      </div>

      {semesters.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <App_Text type="dashSub" text="No semesters added yet" />
          <p className="text-sm text-gray-500 max-w-xs">
            Add semesters to {session.name} to start organizing courses.
          </p>
          <App_Button
            text="+ Add New Semester"
            btnStyle="bg-primary text-white"
            onClick={onAdd}
          />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-gray-500 py-8 text-center">
          No semesters match this filter.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <App_Table columns={columns} data={filtered} />
        </div>
      )}

      {semesters.length > 0 && (
        <App_Button
          text="Add New Semester"
          icon={<Plus className="h-4 w-4" />}
          btnStyle="bg-white border text-primary hover:bg-primary/5 mt-3"
          onClick={onAdd}
        />
      )}
    </div>
  );
};

export default SemestersPanel;
