"use client";
import { Star, BookOpen, Award, TrendingUp } from "lucide-react";
import StatCard from "../../shared/components/stat-card";
import { gpaRemark } from "../gpa_data/gpa_data";
import { ScaleType } from "../gpa_types";

interface GPASummaryCardsProps {
  scale: ScaleType;
  gpa: number;
  totalCreditUnits: number;
  totalGradePoints: number;
  cgpa: number | null;
  hasCourses: boolean;
}

const GPASummaryCards = ({
  scale,
  gpa,
  totalCreditUnits,
  totalGradePoints,
  cgpa,
  hasCourses,
}: GPASummaryCardsProps) => {
  const maxScale = scale === "5.0" ? "5.00" : "4.00";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        icon={Star}
        iconStyle="bg-indigo-100 text-indigo-600"
        label="Semester GPA"
        value={hasCourses ? gpa.toFixed(2) : "—"}
        maxValue={maxScale}
        subLabel={hasCourses ? gpaRemark(gpa, scale) : "Add a course to begin"}
      />
      <StatCard
        icon={BookOpen}
        iconStyle="bg-orange-100 text-orange-600"
        label="Total Credit Units"
        value={String(totalCreditUnits)}
        subLabel="This semester"
      />
      <StatCard
        icon={Award}
        iconStyle="bg-amber-100 text-amber-600"
        label="Total Grade Points"
        value={hasCourses ? totalGradePoints.toFixed(1) : "0.0"}
        subLabel="This semester"
      />
      <StatCard
        icon={TrendingUp}
        iconStyle="bg-blue-100 text-blue-600"
        label="CGPA (Overall)"
        value={cgpa !== null ? cgpa.toFixed(2) : "—"}
        maxValue={cgpa !== null ? maxScale : undefined}
        subLabel={
          cgpa !== null
            ? "Up from last semester"
            : "Add previous CGPA in Settings to track"
        }
      />
    </div>
  );
};

export default GPASummaryCards;
