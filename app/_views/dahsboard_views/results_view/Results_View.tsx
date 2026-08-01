"use client";

import { useEffect, useState } from "react";

import { Upload } from "lucide-react";
import App_Button from "@/app/_components/app_ui/App_Button";
import App_Text from "@/app/_components/app_ui/App_Text";
import {
  useSessions,
  useSemesters,
} from "../academic_record_view/academic_hook/useAcademicApi";
import SemesterSelector from "../courses/courses_components/Semester_Selector";
import { useCourses } from "../courses/courses_hooks/useCourseApi";
import {
  useResults,
  useSaveResults,
  useDeleteResult,
  useSavedGradingSystem,
} from "./result_hook/useResult";
import {
  CourseResultRow,
  buildCourseResultRows,
  computeGPATrend,
  computeCGPA,
} from "./results_data/results-computation";
import CourseResultsTable from "./results_view_components/course-results-table";
import GPATrendChart from "./results_view_components/gpa-trend-chart";
import PreviousSemestersList from "./results_view_components/previous-semesters-list";
import ResultOverviewCards from "./results_view_components/result-overview-cards";
import { ResultsPageSkeleton } from "./results_view_components/skeletons";
import EnterResultsDialog from "./results_view_components/EnterResultModal";
import SemesterSummaryDonut from "./results_view_components/semester-summary-donut";

const ResultsPage = () => {
  const { data: sessions = [], isLoading: l1 } = useSessions();
  const { data: semesters = [], isLoading: l2 } = useSemesters();
  const { data: courses = [], isLoading: l3 } = useCourses();
  const { data: results = [], isLoading: l4 } = useResults();
  const { data: gradingSystem, isLoading: l5 } = useSavedGradingSystem();

  const saveResults = useSaveResults();
  const deleteResult = useDeleteResult();

  const [selectedSemesterId, setSelectedSemesterId] = useState<string | null>(
    null,
  );
  const [uploadOpen, setUploadOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CourseResultRow | null>(
    null,
  );

  const isLoading = l1 || l2 || l3 || l4 || l5;

  useEffect(() => {
    if (!selectedSemesterId && semesters.length > 0) {
      setSelectedSemesterId(
        semesters.find((s) => s.isCurrent)?.id ?? semesters[0].id,
      );
    }
  }, [semesters, selectedSemesterId]);

  if (isLoading) return <ResultsPageSkeleton />;

  if (semesters.length === 0) {
    return (
      <div className="p-4 md:p-6">
        <div className="rounded-xl border bg-white p-10 text-center max-w-lg mx-auto space-y-3">
          <App_Text type="dashTitle" text="No Semesters Found" />
          <p className="text-sm text-gray-500">
            Set up an academic session and semester before entering results.
          </p>
          <App_Button
            text="Go to Sessions & Semesters"
            btnStyle="bg-primary text-white"
          />
        </div>
      </div>
    );
  }

  if (!gradingSystem) {
    // Real implementation: redirect to /grading-system instead of rendering this message.
    return (
      <div className="p-4 md:p-6">
        <div className="rounded-xl border bg-white p-10 text-center max-w-lg mx-auto space-y-3">
          <App_Text type="dashTitle" text="Grading System Not Set" />
          <p className="text-sm text-gray-500">
            Set up your grading system before results can be calculated.
          </p>
          <App_Button
            text="Go to Grading System"
            btnStyle="bg-primary text-white"
          />
        </div>
      </div>
    );
  }

  const selectedSemester =
    semesters.find((s) => s.id === selectedSemesterId) ?? null;
  const selectedSession = sessions.find(
    (s) => s.id === selectedSemester?.sessionId,
  );
  const semesterCourses = courses.filter(
    (c) => c.semesterId === selectedSemesterId,
  );
  const semesterResults = results.filter(
    (r) => r.semesterId === selectedSemesterId,
  );
  const rows = buildCourseResultRows(
    semesterCourses,
    semesterResults,
    gradingSystem.grades,
  );

  const trend = computeGPATrend(
    semesters,
    sessions,
    courses,
    results,
    gradingSystem.grades,
  );
  const currentPoint = trend.find((p) => p.semesterId === selectedSemesterId);
  const currentIndex = trend.findIndex(
    (p) => p.semesterId === selectedSemesterId,
  );
  const previousPoint = currentIndex > 0 ? trend[currentIndex - 1] : undefined;
  const cgpa = computeCGPA(trend, selectedSemesterId ?? undefined);
  const prevCgpa = previousPoint
    ? computeCGPA(trend, previousPoint.semesterId)
    : null;

  const semesterLabel = selectedSemester
    ? `${selectedSession?.name ?? ""} - ${selectedSemester.name}`
    : "Results";
  const canEnterResults = semesterCourses.length > 0;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <App_Text type="dashTitle" text="Results" />
          <p className="text-sm text-gray-500 mt-1">
            View your academic results and track your performance.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {selectedSemesterId && (
            <SemesterSelector
              sessions={sessions}
              semesters={semesters}
              value={selectedSemesterId}
              onChange={setSelectedSemesterId}
            />
          )}
          <App_Button
            text="Enter Results"
            icon={<Upload className="h-4 w-4" />}
            btnStyle="bg-primary text-white"
            onClick={() => setUploadOpen(true)}
            disabled={!canEnterResults}
          />
        </div>
      </div>

      {!canEnterResults && (
        <p className="text-sm text-amber-600 bg-amber-50 rounded-md p-3">
          No courses are registered for this semester yet — add courses first
          before entering results.
        </p>
      )}

      <ResultOverviewCards
        current={currentPoint}
        previous={previousPoint}
        cgpa={cgpa}
        prevCgpa={prevCgpa}
        pointScaleMax={gradingSystem.pointScaleMax}
        coursesTaken={semesterCourses.length}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-2">
          <GPATrendChart
            points={trend}
            pointScaleMax={gradingSystem.pointScaleMax}
          />
        </div>
        {currentPoint && (
          <SemesterSummaryDonut
            rows={rows}
            gpa={currentPoint.gpa}
            pointScaleMax={gradingSystem.pointScaleMax}
            isComplete={currentPoint.isComplete}
          />
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-2">
          <CourseResultsTable
            rows={rows}
            pointScaleMax={gradingSystem.pointScaleMax}
            onEdit={() => setUploadOpen(true)}
            onDelete={setDeleteTarget}
          />
        </div>
        <PreviousSemestersList
          points={trend}
          currentSemesterId={selectedSemesterId}
          onSelect={setSelectedSemesterId}
        />
      </div>

      {selectedSemesterId && (
        <EnterResultsDialog
          open={uploadOpen}
          onOpenChange={setUploadOpen}
          semesterId={selectedSemesterId}
          semesterLabel={semesterLabel}
          courses={semesterCourses}
          existingResults={semesterResults}
          grades={gradingSystem.grades}
          onSave={(input) => saveResults.mutateAsync(input).then(() => {})}
        />
      )}

      {/* <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Result"
        description={`Remove the result for ${deleteTarget?.course.code} - ${deleteTarget?.course.title}? This can't be undone.`}
        confirmText="Delete"
        destructive
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={() => deleteTarget?.result && deleteResult.mutate(deleteTarget.result.id)}
      /> */}
    </div>
  );
};

export default ResultsPage;
