"use client";

import App_Full_Text from "@/components/shared/App_Full_Text";
import { ColumnDef } from "@tanstack/react-table";
import { IAttendanceClasses } from "../attendance_types/Attendance_Classes_Types";

export const recent_attendance_column: ColumnDef<IAttendanceClasses>[] = [
  {
    accessorKey: "course",
    header: () => (
      <div className="px-3 py-2 rounded-l-lg bg-red-400">Courses</div>
    ),
    cell: ({ row }) => {
      const course = row.original.course;
      return (
        <App_Full_Text
          text={{
            header: { text: course.code, type: "dashText" },
            para: { text: course.title, type: "dashText" },
          }}
        />
      );
    },
  },
  {
    accessorKey: "present",
    header: () => <div className="px-3 py-2">Present</div>,
  },
  {
    accessorKey: "absent",
    header: () => <div className="px-3 py-2">Absent</div>,
  },
  {
    accessorKey: "total",
    header: () => (
      <div className="px-3 py-2  rounded-r-lg bg-red-800">Total</div>
    ),
  },
  {
    accessorKey: "attendance",
    header: () => (
      <div className="px-3 py-2 rounded-r-lg bg-red-800">Attendance</div>
    ),
    cell: ({ row }) => {
      const value = row.original.attendance;
      return (
        <div className="h-2 w-full border rounded-xl relative">
          <div
            className="absolute bg-primary h-full rounded-xl"
            style={{ width: `${value}%` }}
          />
        </div>
      );
    },
  },
];

export const recent_attendance_data = [
  {
    course: {
      code: "CHM 121",
      title: "Polymer",
    },
    present: 3,
    absent: 12,
    total: 12,
    attendance: 40,
  },
  {
    course: {
      code: "CHM 121",
      title: "Polymer",
    },
    present: 3,
    absent: 12,
    total: 12,
    attendance: 40,
  },
  {
    course: {
      code: "CHM 121",
      title: "Polymer",
    },
    present: 3,
    absent: 12,
    total: 12,
    attendance: 40,
  },
  {
    course: {
      code: "CHM 121",
      title: "Polymer",
    },
    present: 3,
    absent: 12,
    total: 12,
    attendance: 40,
  },
];
