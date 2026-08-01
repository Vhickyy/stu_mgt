"use client";

import App_Button from "@/app/_components/app_ui/App_Button";
import App_Text from "@/app/_components/app_ui/App_Text";
import App_Table from "@/app/_components/shared/App_Table";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2, BookOpen } from "lucide-react";
import { getGradePoint, round2 } from "../gpa_data/gpa_data";
import { ICourse, ScaleType } from "../gpa_types";

interface CoursesTableProps {
  courses: ICourse[];
  scale: ScaleType;
  onEdit: (course: ICourse) => void;
  onDelete: (course: ICourse) => void;
  onAddCourse: () => void;
  totalCreditUnits: number;
  totalPoints: number;
}

const CoursesTable = ({
  courses,
  scale,
  onEdit,
  onDelete,
  onAddCourse,
  totalCreditUnits,
  totalPoints,
}: CoursesTableProps) => {
  const columns: ColumnDef<ICourse>[] = [
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
    { accessorKey: "creditUnits", header: "Credit Units" },
    {
      accessorKey: "grade",
      header: "Grade",
      cell: ({ getValue }) => {
        const grade = getValue<string>();
        const color =
          grade === "F"
            ? "text-red-600"
            : grade.startsWith("A")
              ? "text-green-600"
              : "text-gray-700";
        return <span className={color}>{grade}</span>;
      },
    },
    {
      header: "Grade Point",
      cell: ({ row }) => getGradePoint(scale, row.original.grade).toFixed(1),
    },
    {
      header: "Points Earned",
      cell: ({ row }) =>
        round2(
          getGradePoint(scale, row.original.grade) * row.original.creditUnits,
        ).toFixed(1),
    },
    {
      header: "Action",
      cell: ({ row }) => (
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
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between mb-2">
        <App_Text type="cardhead" text="Courses This Semester" />
        <App_Button
          text="Add Course"
          btnStyle="bg-white border text-primary hover:bg-primary/5 hidden md:inline-flex"
          onClick={onAddCourse}
        />
      </div>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-12 text-center">
          <BookOpen className="h-10 w-10 text-gray-300" />
          <App_Text type="dashSub" text="No courses added yet" />
          <p className="text-sm text-gray-500 max-w-xs">
            Add your courses for this semester to calculate your GPA.
          </p>
          <App_Button
            text="+ Add Course"
            btnStyle="bg-primary text-white"
            onClick={onAddCourse}
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <App_Table columns={columns} data={courses} />
          <App_Button
            text="+ Add Course"
            btnStyle="bg-white border text-primary hover:bg-primary/5 mt-3 md:hidden"
            onClick={onAddCourse}
          />
          <div className="mt-3 flex items-center justify-between rounded-md bg-primary/5 px-4 py-3 text-sm font-semibold">
            <span>Total</span>
            <span>{totalCreditUnits} Units</span>
            <span>{totalPoints.toFixed(1)} Points Earned</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesTable;
