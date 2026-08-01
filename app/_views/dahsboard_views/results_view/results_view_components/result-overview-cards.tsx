import { TrendingUp, BookOpen, LayoutGrid, Star } from "lucide-react";
import StatCard from "../../shared/components/stat-card";
import { SemesterGPAPoint } from "../results_data/results-computation";

const ResultOverviewCards = ({
  current,
  previous,
  cgpa,
  prevCgpa,
  pointScaleMax,
  coursesTaken,
}: {
  current: SemesterGPAPoint | undefined;
  previous: SemesterGPAPoint | undefined;
  cgpa: number | null;
  prevCgpa: number | null;
  pointScaleMax: number;
  coursesTaken: number;
}) => {
  const gpaDelta =
    current && previous ? round1(current.gpa - previous.gpa) : null;
  const cgpaDelta =
    cgpa !== null && prevCgpa !== null ? round1(cgpa - prevCgpa) : null;

  function round1(n: number) {
    return Math.round(n * 100) / 100;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatCard
        icon={TrendingUp}
        iconStyle="bg-indigo-100 text-indigo-600"
        label="Semester GPA"
        value={current && current.isComplete ? current.gpa.toFixed(2) : "—"}
        maxValue={pointScaleMax.toFixed(2)}
        subLabel={
          !current || !current.isComplete
            ? "Results incomplete for this semester"
            : gpaDelta !== null
              ? `${gpaDelta >= 0 ? "↑" : "↓"} ${Math.abs(gpaDelta).toFixed(2)} from last semester`
              : undefined
        }
      />
      <StatCard
        icon={BookOpen}
        iconStyle="bg-orange-100 text-orange-600"
        label="Total Credit Units"
        value={String(current?.totalCreditUnits ?? 0)}
        subLabel="Completed this semester"
      />
      <StatCard
        icon={LayoutGrid}
        iconStyle="bg-blue-100 text-blue-600"
        label="Courses Taken"
        value={String(coursesTaken)}
        subLabel="This semester"
      />
      <StatCard
        icon={Star}
        iconStyle="bg-green-100 text-green-600"
        label="CGPA (Overall)"
        value={cgpa !== null ? cgpa.toFixed(2) : "—"}
        maxValue={cgpa !== null ? pointScaleMax.toFixed(2) : undefined}
        subLabel={
          cgpaDelta !== null
            ? `${cgpaDelta >= 0 ? "↑" : "↓"} ${Math.abs(cgpaDelta).toFixed(2)} from last semester`
            : undefined
        }
      />
    </div>
  );
};

export default ResultOverviewCards;
