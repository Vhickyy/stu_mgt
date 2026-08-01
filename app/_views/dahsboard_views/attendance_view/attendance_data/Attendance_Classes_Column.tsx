"use client";

import App_Full_Text from "@/app/_components/shared/App_Full_Text";
import { ColumnDef } from "@tanstack/react-table";
import { IAttendanceClasses } from "../attendance_types/Attendance_Classes_Types";
import App_Text from "@/app/_components/app_ui/App_Text";

export const attendance_classes_column: ColumnDef<IAttendanceClasses>[] = [
  {
    accessorKey: "course",
    header: () => <div>Courses</div>,
    cell: ({ row }) => {
      const course = row.original.course;
      return (
        <App_Full_Text
          text={{
            textContentStyle: "gap-y-0",
            header: {
              text: course.code,
              type: "dashText",
              style: "text-xs font-semibold",
            },
            para: {
              text: course.title,
              type: "dashText",
              style: "text-xs",
            },
          }}
        />
      );
    },
  },
  {
    accessorKey: "present",
    header: () => <div className="text-center">Present</div>,
    cell: ({ row }) => {
      const value = row.original.present;
      return (
        <App_Text
          type="dashText"
          text={`${value}`}
          style="font-semibold text-center text-green-500 text-xs"
        />
      );
    },
  },
  {
    accessorKey: "absent",
    header: () => <div className="text-center">Absent</div>,
    cell: ({ row }) => {
      const value = row.original.absent;
      return (
        <App_Text
          type="dashText"
          text={`${value}`}
          style="font-semibold text-center text-red-500 text-xs"
        />
      );
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="text-center">Total</div>,
    cell: ({ row }) => {
      const value = row.original.total;
      return (
        <App_Text
          type="dashText"
          text={`${value}`}
          style="font-semibold text-center  text-xs"
        />
      );
    },
  },
  {
    accessorKey: "attendance",
    header: () => <div>Attendance</div>,
    cell: ({ row }) => {
      const value = row.original.attendance;
      return (
        <div className="w-full flex flex-col">
          <App_Text
            type="dashText"
            text={`${value}%`}
            style="font-semibold text-xs"
          />
          <div className="h-2 w-full border rounded-xl relative">
            <div
              className={`absolute h-full rounded-xl ${value < 20 ? "bg-red-500" : value < 50 ? "bg-amber-500" : "bg-green-600"}`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      );
    },
  },
];

export const attendance_classes_data = [
  {
    course: {
      code: "CSC 401",
      title: "Operating Systems",
    },
    present: 18,
    absent: 2,
    total: 20,
    attendance: 90,
  },
  {
    course: {
      code: "MTH 403",
      title: "Numerical Analysis",
    },
    present: 14,
    absent: 6,
    total: 20,
    attendance: 70,
  },
  {
    course: {
      code: "GST 301",
      title: "Entrepreneurship Studies",
    },
    present: 10,
    absent: 5,
    total: 15,
    attendance: 67,
  },
  {
    course: {
      code: "PHY 405",
      title: "Electromagnetism",
    },
    present: 16,
    absent: 4,
    total: 20,
    attendance: 80,
  },
  {
    course: {
      code: "CHM 421",
      title: "Industrial Chemistry",
    },
    present: 9,
    absent: 6,
    total: 15,
    attendance: 60,
  },
  {
    course: {
      code: "CSC 404",
      title: "Software Engineering",
    },
    present: 19,
    absent: 1,
    total: 20,
    attendance: 95,
  },
];
