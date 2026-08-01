"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IResult } from "../dashboard_types";

export const result_col: ColumnDef<IResult>[] = [
  {
    accessorKey: "course",
    header: () => <div>Courses</div>,
  },
  {
    accessorKey: "unit",
    header: () => <div>Unit</div>,
  },
  {
    accessorKey: "grades",
    header: () => <div>Grades</div>,
  },
  {
    accessorKey: "points",
    header: () => <div>Points</div>,
  },
];

export const result_data = [
  {
    course: "CSC 101 - Data structures",
    unit: 3,
    grades: "A",
    points: 5,
  },
  {
    course: "MTH 101 - Linear Algebra",
    unit: 2,
    grades: "B",
    points: 4,
  },
  {
    course: "GST 101 - English",
    unit: 1,
    grades: "C",
    points: 3,
  },
  {
    course: "PHY 101 - Physics",
    unit: 1,
    grades: "C",
    points: 3,
  },
];

export const resultle_data = [
  {
    course: "CSC 101",
    unit: 3,
    grades: "A",
    points: 5,
  },
  {
    course: "MTH 101",
    unit: 2,
    grades: "B",
    points: 4,
  },
  {
    course: "GST 101",
    unit: 1,
    grades: "C",
    points: 3,
  },
  {
    course: "PHY 101",
    unit: 1,
    grades: "C",
    points: 3,
  },
];
