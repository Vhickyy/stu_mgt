"use client";

import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Pencil, Trash2, BookOpen, Plus } from "lucide-react";
import App_Button from "@/app/_components/app_ui/App_Button";
import App_Text from "@/app/_components/app_ui/App_Text";
import App_Table from "@/app/_components/shared/App_Table";
import { Course } from "../courses_types";

interface CurrentSemesterTableProps {
  semesterLabel: string;
  courses: Course[];
  isEditable: boolean;
  totalCreditHours: number;
  allowedCreditHours: number;
  onAdd: () => void;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
}

const CurrentSemesterTable = ({
  semesterLabel,
  courses,
  isEditable,
  totalCreditHours,
  allowedCreditHours,
  onAdd,
  onEdit,
  onDelete,
}: CurrentSemesterTableProps) => {
  const columns: ColumnDef<Course>[] = [
    { header: "#", cell: ({ row }) => row.index + 1 },
    { accessorKey: "code", header: "Course Code" },
    {
      accessorKey: "title",
      header: "Course Title",
      cell: ({ getValue }) => (
        <span
          className="block max-w-[160px] truncate md:max-w-xs"
          title={getValue<string>()}
        >
          {getValue<string>()}
        </span>
      ),
    },
    { accessorKey: "creditHours", header: "Credit Hours" },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ getValue }) => {
        const type = getValue<string>();
        return (
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              type === "Core"
                ? "bg-indigo-50 text-indigo-600"
                : "bg-purple-50 text-purple-600",
            )}
          >
            {type}
          </span>
        );
      },
    },
    {
      header: "Status",
      cell: () => (
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-xs font-medium",
            isEditable
              ? "bg-green-100 text-green-700"
              : "bg-blue-50 text-blue-600",
          )}
        >
          {isEditable ? "Registered" : "Completed"}
        </span>
      ),
    },
    ...(isEditable
      ? [
          {
            header: "Action",
            cell: ({ row }: { row: { original: Course } }) => (
              <div className="flex items-center gap-3">
                <button
                  aria-label={`Edit ${row.original.code}`}
                  onClick={() => onEdit(row.original)}
                  className="text-gray-500 hover:text-primary"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  aria-label={`Delete ${row.original.code}`}
                  onClick={() => onDelete(row.original)}
                  className="text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ),
          } as ColumnDef<Course>,
        ]
      : []),
  ];

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <App_Text type="cardhead" text={semesterLabel} />
          <span className="rounded-full bg-primary/10 text-primary text-xs font-medium px-2 py-0.5">
            {courses.length} {courses.length === 1 ? "Course" : "Courses"}
          </span>
        </div>
        {isEditable && (
          <App_Button
            text="Add Course"
            btnStyle="bg-white border text-primary hover:bg-primary/5 hidden md:inline-flex"
            onClick={onAdd}
          />
        )}
      </div>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <BookOpen className="h-10 w-10 text-gray-300" />
          <App_Text type="dashSub" text="No courses registered yet" />
          <p className="text-sm text-gray-500 max-w-xs">
            {isEditable
              ? "Add your courses for this semester to get started."
              : "No courses were recorded for this semester."}
          </p>
          {isEditable && (
            <App_Button
              text="+ Add Course"
              btnStyle="bg-primary text-white"
              onClick={onAdd}
            />
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <App_Table columns={columns} data={courses} />
          {isEditable && (
            <App_Button
              text="+ Add Course"
              icon={<Plus className="h-4 w-4" />}
              btnStyle="bg-white border text-primary hover:bg-primary/5 mt-3 md:hidden"
              onClick={onAdd}
            />
          )}
          <div className="mt-3 flex items-center justify-between rounded-md bg-primary/5 px-4 py-3 text-sm font-semibold">
            <span>Total Credit Hours</span>
            <span>{totalCreditHours}</span>
            {isEditable && (
              <span className="text-gray-500 font-normal">
                Allowed Credit Hours: {allowedCreditHours}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentSemesterTable;
