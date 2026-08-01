"use client";

import {
  useSessions,
  useSemesters,
} from "../academic_record_view/academic_hook/useAcademicApi";
import { useCourses } from "../courses/courses_hooks/useCourseApi";
import {
  useResults,
  useSavedGradingSystem,
} from "../results_view/result_hook/useResult";
import {
  computeGPATrend,
  buildCourseResultRows,
  computeCGPA,
} from "../results_view/results_data/results-computation";
import GPATrendChart from "../results_view/results_view_components/gpa-trend-chart";
import DashboardOverviewCards from "./dash_components/dashboard-overview-cards";
import QuickLinksGrid from "./dash_components/quick-links-grid";
import RecentGradesCard from "./dash_components/recent-grades-card";
import ResultsNudgeBanner from "./dash_components/results-nudge-banner";
import SemesterProgressCard from "./dash_components/semester-progress-card";
import SetupChecklist from "./dash_components/setup-checklist";
import { DashboardSkeleton } from "./dash_components/skeletons";
import WelcomeHeader from "./dash_components/welcome-header";
import {
  computeSetupStatus,
  daysRemainingInSemester,
  computeSemesterProgress,
} from "./dash_data/dash_data";

// TODO: replace with real authenticated student profile once auth/profile exists
const STUDENT_NAME = "Victoria Okonnah";

const DashboardPage = () => {
  const { data: sessions = [], isLoading: l1 } = useSessions();
  const { data: semesters = [], isLoading: l2 } = useSemesters();
  const { data: courses = [], isLoading: l3 } = useCourses();
  const { data: results = [], isLoading: l4 } = useResults();
  const { data: gradingSystem, isLoading: l5 } = useSavedGradingSystem();

  const isLoading = l1 || l2 || l3 || l4 || l5;

  if (isLoading) return <DashboardSkeleton />;

  const currentSemester = semesters.find((s) => s.isCurrent) ?? null;
  const currentSession =
    sessions.find((s) => s.id === currentSemester?.sessionId) ?? null;
  const coursesThisSemester = courses.filter(
    (c) => c.semesterId === currentSemester?.id,
  );

  const setupStatus = computeSetupStatus({
    hasGradingSystem: Boolean(gradingSystem),
    hasSession: sessions.length > 0,
    hasCurrentSemester: Boolean(currentSemester),
    hasCourses: coursesThisSemester.length > 0,
  });

  const pointScaleMax = gradingSystem?.pointScaleMax ?? 5;
  const trend = gradingSystem
    ? computeGPATrend(
        semesters,
        sessions,
        courses,
        results,
        gradingSystem.grades,
      )
    : [];
  const currentPoint = trend.find((p) => p.semesterId === currentSemester?.id);
  const cgpa = gradingSystem ? computeCGPA(trend, currentSemester?.id) : null;

  const currentSemesterRows =
    gradingSystem && currentSemester
      ? buildCourseResultRows(
          coursesThisSemester,
          results.filter((r) => r.semesterId === currentSemester.id),
          gradingSystem.grades,
        )
      : [];
  const pendingResultsCount = currentSemesterRows.filter(
    (r) => r.result === null,
  ).length;

  const semesterLabel =
    currentSession && currentSemester
      ? `${currentSession.name} - ${currentSemester.name}`
      : null;

  return (
    <div className="space-y-6">
      <WelcomeHeader name={STUDENT_NAME} semesterLabel={semesterLabel} />

      {!setupStatus.isComplete && <SetupChecklist status={setupStatus} />}

      {setupStatus.isComplete && (
        <ResultsNudgeBanner pendingCount={pendingResultsCount} />
      )}

      <DashboardOverviewCards
        semesterGPA={
          currentPoint && currentPoint.isComplete ? currentPoint.gpa : null
        }
        pointScaleMax={pointScaleMax}
        cgpa={cgpa}
        coursesThisSemester={coursesThisSemester.length}
        daysRemaining={daysRemainingInSemester(currentSemester)}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-2">
          <GPATrendChart points={trend} pointScaleMax={pointScaleMax} />
        </div>
        <div className="space-y-6">
          <SemesterProgressCard
            semester={currentSemester}
            progress={computeSemesterProgress(currentSemester)}
          />
          <RecentGradesCard rows={currentSemesterRows} />
        </div>
      </div>

      <QuickLinksGrid />
    </div>
  );
};

export default DashboardPage;
