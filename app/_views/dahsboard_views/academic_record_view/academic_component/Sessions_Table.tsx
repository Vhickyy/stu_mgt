"use client";

import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Pencil, Trash2, Plus } from "lucide-react";
import App_Button from "@/app/_components/app_ui/App_Button";
import App_Select from "@/app/_components/app_ui/App_Select";
import App_Text from "@/app/_components/app_ui/App_Text";
import App_Table from "@/app/_components/shared/App_Table";
import { AcademicSession, Semester } from "../academic_types";
import { TableSkeleton } from "./Academic_Skeleton";

const STATUS_FILTERS = [
  { label: "All Sessions", key: "all" },
  { label: "Active", key: "active" },
  { label: "Completed", key: "completed" },
];

interface SessionsTableProps {
  sessions: AcademicSession[];
  semesters: Semester[];
  isLoading: boolean;
  selectedSessionId: string | null;
  onSelectSession: (id: string) => void;
  onCreate: () => void;
  onEdit: (session: AcademicSession) => void;
  onDelete: (session: AcademicSession) => void;
}

const SessionsTable = ({
  sessions,
  semesters,
  isLoading,
  selectedSessionId,
  onSelectSession,
  onCreate,
  onEdit,
  onDelete,
}: SessionsTableProps) => {
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = useMemo(() => {
    if (statusFilter === "all") return sessions;
    if (statusFilter === "active") return sessions.filter((s) => s.isActive);
    return sessions.filter((s) => !s.isActive);
  }, [sessions, statusFilter]);

  const columns: ColumnDef<AcademicSession>[] = [
    { header: "#", cell: ({ row }) => row.index + 1 },
    {
      header: "Session",
      cell: ({ row }) => (
        <button
          onClick={() => onSelectSession(row.original.id)}
          className={cn(
            "font-medium hover:underline",
            selectedSessionId === row.original.id && "text-primary",
          )}
        >
          {row.original.name}
        </button>
      ),
    },
    { accessorKey: "startYear", header: "Start Year" },
    { accessorKey: "endYear", header: "End Year" },
    {
      header: "Total Semesters",
      cell: ({ row }) =>
        semesters.filter((s) => s.sessionId === row.original.id).length,
    },
    {
      header: "Total Courses",
      cell: ({ row }) =>
        semesters
          .filter((s) => s.sessionId === row.original.id)
          .reduce((sum, s) => sum + s.totalCourses, 0),
    },
    {
      header: "Total Credits",
      cell: ({ row }) =>
        semesters
          .filter((s) => s.sessionId === row.original.id)
          .reduce((sum, s) => sum + s.totalCreditHours, 0),
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-medium",
            row.original.isActive
              ? "bg-green-100 text-green-700"
              : "bg-blue-50 text-blue-600",
          )}
        >
          {row.original.isActive ? "Active" : "Completed"}
        </span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <button
            aria-label="Edit session"
            onClick={() => onEdit(row.original)}
            className="text-gray-500 hover:text-primary"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            aria-label="Delete session"
            onClick={() => onDelete(row.original)}
            className="text-gray-500 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) return <TableSkeleton rows={3} />;

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <App_Text type="cardhead" text="Academic Sessions" />
        <App_Select
          data={STATUS_FILTERS}
          value={statusFilter}
          placeholder="Filter"
          onChange={setStatusFilter}
          style="w-40"
        />
      </div>

      {sessions.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <App_Text type="dashSub" text="No academic sessions yet" />
          <p className="text-sm text-gray-500 max-w-xs">
            Create your first academic session to start organizing semesters and
            courses.
          </p>
          <App_Button
            text="+ Create New Session"
            btnStyle="bg-primary text-white"
            onClick={onCreate}
          />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-gray-500 py-8 text-center">
          No sessions match this filter.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <App_Table columns={columns} data={filtered} />
        </div>
      )}

      {sessions.length > 0 && (
        <App_Button
          text="Create New Session"
          icon={<Plus className="h-4 w-4" />}
          btnStyle="bg-white border text-primary hover:bg-primary/5 mt-3"
          onClick={onCreate}
        />
      )}
    </div>
  );
};

export default SessionsTable;
