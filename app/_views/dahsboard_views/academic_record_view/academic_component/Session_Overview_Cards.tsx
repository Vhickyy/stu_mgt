import { Calendar, BookOpen, Library, ClipboardList } from "lucide-react";
import StatCard from "../../shared/components/stat-card";
import { AcademicSession, Semester } from "../academic_types";
import { OverviewCardsSkeleton } from "./Academic_Skeleton";

const SessionOverviewCards = ({
  sessions,
  semesters,
  isLoading,
}: {
  sessions: AcademicSession[];
  semesters: Semester[];
  isLoading: boolean;
}) => {
  if (isLoading) return <OverviewCardsSkeleton />;

  const totalCourses = semesters.reduce((sum, s) => sum + s.totalCourses, 0);
  const totalCredits = semesters.reduce(
    (sum, s) => sum + s.totalCreditHours,
    0,
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        icon={Calendar}
        iconStyle="bg-indigo-100 text-indigo-600"
        label="Total Sessions"
        value={String(sessions.length)}
        subLabel="Academic sessions"
      />
      <StatCard
        icon={BookOpen}
        iconStyle="bg-orange-100 text-orange-600"
        label="Total Semesters"
        value={String(semesters.length)}
        subLabel="Across all sessions"
      />
      <StatCard
        icon={Library}
        iconStyle="bg-green-100 text-green-600"
        label="Total Courses"
        value={String(totalCourses)}
        subLabel="Across all semesters"
      />
      <StatCard
        icon={ClipboardList}
        iconStyle="bg-amber-100 text-amber-600"
        label="Total Credit Hours"
        value={String(totalCredits)}
        subLabel="Across all semesters"
      />
    </div>
  );
};

export default SessionOverviewCards;
