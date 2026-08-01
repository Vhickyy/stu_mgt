"use client";

import App_Button from "@/app/_components/app_ui/App_Button";
import App_Text from "@/app/_components/app_ui/App_Text";
import App_Table from "@/app/_components/shared/App_Table";
import { ColumnDef } from "@tanstack/react-table";
import {
  Semester,
  AcademicSession,
} from "../../academic_record_view/academic_types";
import { Course } from "../courses_types";
interface PreviousRow {
  semester: Semester;
  sessionName: string;
  courseCount: number;
  creditHours: number;
}

const PreviousSemestersTable = ({
  sessions,
  semesters,
  courses,
  onViewCourses,
}: {
  sessions: AcademicSession[];
  semesters: Semester[];
  courses: Course[];
  onViewCourses: (semesterId: string) => void;
}) => {
  const rows: PreviousRow[] = semesters
    .filter((s) => !s.isCurrent)
    .sort((a, b) => b.startDate.localeCompare(a.startDate))
    .map((sem) => {
      const semCourses = courses.filter((c) => c.semesterId === sem.id);
      return {
        semester: sem,
        sessionName:
          sessions.find((s) => s.id === sem.sessionId)?.name ?? "Unknown",
        courseCount: semCourses.length,
        creditHours: semCourses.reduce((sum, c) => sum + c.creditHours, 0),
      };
    });

  const columns: ColumnDef<PreviousRow>[] = [
    {
      header: "Semester",
      cell: ({ row }) =>
        `${row.original.sessionName} - ${row.original.semester.name}`,
    },
    { header: "Total Courses", cell: ({ row }) => row.original.courseCount },
    {
      header: "Total Credit Hours",
      cell: ({ row }) => row.original.creditHours,
    },
    {
      header: "Status",
      cell: () => (
        <span className="rounded-full bg-blue-50 text-blue-600 px-2 py-0.5 text-xs font-medium">
          Completed
        </span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <App_Button
          text="View Courses"
          btnStyle="bg-white border text-primary hover:bg-primary/5 text-sm"
          onClick={() => onViewCourses(row.original.semester.id)}
        />
      ),
    },
  ];

  return (
    <div className="rounded-xl border bg-white p-4">
      <App_Text type="cardhead" text="Previous Semesters" />
      {rows.length === 0 ? (
        <p className="text-sm text-gray-500 py-8 text-center">
          No completed semesters yet.
        </p>
      ) : (
        <div className="overflow-x-auto mt-2">
          <App_Table columns={columns} data={rows} />
        </div>
      )}
    </div>
  );
};

export default PreviousSemestersTable;
