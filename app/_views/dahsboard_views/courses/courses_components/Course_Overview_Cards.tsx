import { ClipboardList, BookOpen, CheckCircle2, Award } from "lucide-react";
import { Semester } from "../../academic_record_view/academic_types";
import StatCard from "../../shared/components/stat-card";
import { PROGRAM_TOTAL_CREDIT_HOURS } from "../courses_data/courses_data";
import { Course } from "../courses_types";

const CourseOverviewCards = ({
  currentSemesterCourses,
  allCourses,
  semesters,
}: {
  currentSemesterCourses: Course[];
  allCourses: Course[];
  semesters: Semester[];
}) => {
  const totalCourses = currentSemesterCourses.length;
  const totalCreditHours = currentSemesterCourses.reduce(
    (sum, c) => sum + c.creditHours,
    0,
  );

  const completedSemesterIds = new Set(
    semesters.filter((s) => !s.isCurrent).map((s) => s.id),
  );
  const completedCreditHours = allCourses
    .filter((c) => completedSemesterIds.has(c.semesterId))
    .reduce((sum, c) => sum + c.creditHours, 0);

  const remaining = Math.max(
    PROGRAM_TOTAL_CREDIT_HOURS - completedCreditHours,
    0,
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        icon={ClipboardList}
        iconStyle="bg-indigo-100 text-indigo-600"
        label="Total Courses"
        value={String(totalCourses)}
        subLabel="This semester"
      />
      <StatCard
        icon={BookOpen}
        iconStyle="bg-orange-100 text-orange-600"
        label="Total Credit Hours"
        value={String(totalCreditHours)}
        subLabel="This semester"
      />
      <StatCard
        icon={CheckCircle2}
        iconStyle="bg-green-100 text-green-600"
        label="Completed Credit Hours"
        value={String(completedCreditHours)}
        subLabel="Across all semesters"
      />
      <StatCard
        icon={Award}
        iconStyle="bg-amber-100 text-amber-600"
        label="Remaining Credit to Graduate"
        value={String(remaining)}
        subLabel={`To reach ${PROGRAM_TOTAL_CREDIT_HOURS} credit hours`}
      />
    </div>
  );
};

export default CourseOverviewCards;
