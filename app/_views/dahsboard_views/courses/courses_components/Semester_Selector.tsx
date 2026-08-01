"use client";

import App_Select from "@/app/_components/app_ui/App_Select";
import {
  AcademicSession,
  Semester,
} from "../../academic_record_view/academic_types";

const SemesterSelector = ({
  sessions,
  semesters,
  value,
  onChange,
}: {
  sessions: AcademicSession[];
  semesters: Semester[];
  value: string;
  onChange: (semesterId: string) => void;
}) => {
  const data = [...semesters]
    .sort((a, b) => b.startDate.localeCompare(a.startDate))
    .map((sem) => {
      const session = sessions.find((s) => s.id === sem.sessionId);
      return {
        key: sem.id,
        label: `${session?.name ?? "Unknown"} - ${sem.name}${sem.isCurrent ? " (Current)" : ""}`,
      };
    });

  return (
    <App_Select
      data={data}
      value={value}
      placeholder="Select semester"
      onChange={onChange}
      style="min-w-[220px]"
    />
  );
};

export default SemesterSelector;
