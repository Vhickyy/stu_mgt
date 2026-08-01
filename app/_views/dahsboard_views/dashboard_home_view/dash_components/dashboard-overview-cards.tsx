import { TrendingUp, Star, LayoutGrid, CalendarClock } from "lucide-react";
import StatCard from "../../shared/components/stat-card";

interface DashboardOverviewCardsProps {
  semesterGPA: number | null;
  pointScaleMax: number;
  cgpa: number | null;
  coursesThisSemester: number;
  daysRemaining: number | null;
}

const DashboardOverviewCards = ({
  semesterGPA,
  pointScaleMax,
  cgpa,
  coursesThisSemester,
  daysRemaining,
}: DashboardOverviewCardsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        icon={TrendingUp}
        iconStyle="bg-indigo-100 text-indigo-600"
        label="Semester GPA"
        value={semesterGPA !== null ? semesterGPA.toFixed(2) : "—"}
        maxValue={semesterGPA !== null ? pointScaleMax.toFixed(2) : undefined}
        subLabel={semesterGPA === null ? "No results yet" : undefined}
      />
      <StatCard
        icon={Star}
        iconStyle="bg-green-100 text-green-600"
        label="CGPA (Overall)"
        value={cgpa !== null ? cgpa.toFixed(2) : "—"}
        maxValue={cgpa !== null ? pointScaleMax.toFixed(2) : undefined}
        subLabel={cgpa === null ? "No graded semesters yet" : undefined}
      />
      <StatCard
        icon={LayoutGrid}
        iconStyle="bg-orange-100 text-orange-600"
        label="Courses This Semester"
        value={String(coursesThisSemester)}
        subLabel="Registered"
      />
      <StatCard
        icon={CalendarClock}
        iconStyle="bg-blue-100 text-blue-600"
        label="Days Left in Semester"
        value={daysRemaining !== null ? String(daysRemaining) : "—"}
        subLabel={
          daysRemaining === null ? "No active semester" : "Until semester ends"
        }
      />
    </div>
  );
};

export default DashboardOverviewCards;
