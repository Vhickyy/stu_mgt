"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IResults } from "../results_types/Results_Type";

export const results_col: ColumnDef<IResults>[] = [
  {
    accessorKey: "code",
    header: () => <div>Code</div>,
  },
  {
    accessorKey: "title",
    header: () => <div>Title</div>,
  },
  {
    accessorKey: "unit",
    header: () => <div>Unit</div>,
  },
  {
    accessorKey: "grade",
    header: () => <div>Grade</div>,
  },
  {
    accessorKey: "gradePoint",
    header: () => <div>Grade Point</div>,
  },
  {
    accessorKey: "pointsEarned",
    header: () => <div>Points Earned</div>,
  },
];

export const results_data = [
  {
    code: "CSC 401",
    title: "Data Structures",
    unit: 3,
    grade: "A",
    gradePoint: 5.0,
    pointsEarned: 15.0,
  },
  {
    code: "MTH 403",
    title: "Linear Algebra",
    unit: 3,
    grade: "B",
    gradePoint: 4.0,
    pointsEarned: 12.0,
  },
  {
    code: "PHY 405",
    title: "General Physics",
    unit: 3,
    grade: "A",
    gradePoint: 5.0,
    pointsEarned: 15.0,
  },
  {
    code: "ENG 201",
    title: "Technical Writing",
    unit: 2,
    grade: "B",
    gradePoint: 4.0,
    pointsEarned: 8.0,
  },
  {
    code: "CHM 203",
    title: "Organic Chemistry",
    unit: 3,
    grade: "A",
    gradePoint: 5.0,
    pointsEarned: 15.0,
  },
  {
    code: "ECO 101",
    title: "Principles of Economics",
    unit: 3,
    grade: "B",
    gradePoint: 4.0,
    pointsEarned: 12.0,
  },
];

export const results_summary = {
  semester: "2023/2024 - 1",
  totalCourses: 6,
  totalUnits: 17,
  totalPoints: 77.0,
  gpa: 4.12,
  cgpa: 4.05,
  maxGpa: 5.0,
};
