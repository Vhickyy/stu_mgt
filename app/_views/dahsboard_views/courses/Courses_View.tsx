"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import App_Button from "@/app/_components/app_ui/App_Button";
import App_Text from "@/app/_components/app_ui/App_Text";
import {
  useSessions,
  useSemesters,
} from "../academic_record_view/academic_hook/useAcademicApi";
import CourseOverviewCards from "./courses_components/Course_Overview_Cards";
import CurrentSemesterTable from "./courses_components/current-semester-table";
import PreviousSemestersTable from "./courses_components/previous-semesters-table";
import SemesterSelector from "./courses_components/Semester_Selector";
import { CoursesPageSkeleton } from "./courses_components/Skeletons";
import { ALLOWED_CREDIT_HOURS_PER_SEMESTER } from "./courses_data/courses_data";
import {
  useCourses,
  useCreateCourse,
  useUpdateCourse,
  useDeleteCourse,
} from "./courses_hooks/useCourseApi";
import AddCourseDialog from "./courses_modals/Add_Course_Modal";
import { Course } from "./courses_types";

const CoursesPage = () => {
  const { data: sessions = [], isLoading: sessionsLoading } = useSessions();
  const { data: semesters = [], isLoading: semestersLoading } = useSemesters();
  const { data: courses = [], isLoading: coursesLoading } = useCourses();

  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();
  const deleteCourse = useDeleteCourse();

  const [selectedSemesterId, setSelectedSemesterId] = useState<string | null>(
    null,
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);

  const isLoading = sessionsLoading || semestersLoading || coursesLoading;

  // default selection to the current semester once data loads
  useEffect(() => {
    if (!selectedSemesterId && semesters.length > 0) {
      setSelectedSemesterId(
        semesters.find((s) => s.isCurrent)?.id ?? semesters[0].id,
      );
    }
  }, [semesters, selectedSemesterId]);

  if (isLoading) return <CoursesPageSkeleton />;

  if (semesters.length === 0) {
    return (
      <div className="p-4 md:p-6">
        <div className="rounded-xl border bg-white p-10 text-center max-w-lg mx-auto space-y-3">
          <App_Text type="dashTitle" text="No Semesters Found" />
          <p className="text-sm text-gray-500">
            Courses are organized by semester. Create an academic session and
            semester first before registering courses.
          </p>
          <App_Button
            text="Go to Sessions & Semesters"
            btnStyle="bg-primary text-white"
          />
        </div>
      </div>
    );
  }

  const selectedSemester =
    semesters.find((s) => s.id === selectedSemesterId) ?? null;
  const isEditable = selectedSemester?.isCurrent ?? false;
  const currentSemesterCourses = courses.filter(
    (c) => c.semesterId === selectedSemesterId,
  );
  const totalCreditHours = currentSemesterCourses.reduce(
    (sum, c) => sum + c.creditHours,
    0,
  );
  const selectedSession = sessions.find(
    (s) => s.id === selectedSemester?.sessionId,
  );

  const openAddDialog = () => {
    setEditingCourse(null);
    setDialogOpen(true);
  };

  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    setDialogOpen(true);
  };

  const handleSave = async (input: Omit<Course, "id">) => {
    if (editingCourse) {
      await updateCourse.mutateAsync({ id: editingCourse.id, patch: input });
    } else {
      await createCourse.mutateAsync(input);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <App_Text type="dashTitle" text="Courses" />
          <p className="text-sm text-gray-500 mt-1">
            Manage your registered courses for each semester.
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
          {isEditable && (
            <App_Button
              text="Add Course"
              icon={<Plus className="h-4 w-4" />}
              btnStyle="bg-primary text-white"
              onClick={openAddDialog}
            />
          )}
        </div>
      </div>

      <CourseOverviewCards
        currentSemesterCourses={currentSemesterCourses}
        allCourses={courses}
        semesters={semesters}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-2">
          <CurrentSemesterTable
            semesterLabel={
              selectedSemester
                ? `${selectedSession?.name ?? ""} - ${selectedSemester.name}`
                : "Courses"
            }
            courses={currentSemesterCourses}
            isEditable={isEditable}
            totalCreditHours={totalCreditHours}
            allowedCreditHours={ALLOWED_CREDIT_HOURS_PER_SEMESTER}
            onAdd={openAddDialog}
            onEdit={openEditDialog}
            onDelete={setDeleteTarget}
          />
        </div>
        {/* {isEditable && <CreditHourSummary registered={totalCreditHours} />} */}
      </div>

      <PreviousSemestersTable
        sessions={sessions}
        semesters={semesters}
        courses={courses}
        onViewCourses={setSelectedSemesterId}
      />

      {selectedSemesterId && (
        <AddCourseDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          semesterId={selectedSemesterId}
          allCourses={courses}
          onSave={handleSave}
          editingCourse={editingCourse}
        />
      )}

      {/* <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Course"
        description={`Are you sure you want to remove ${deleteTarget?.code} - ${deleteTarget?.title} from this semester? This action cannot be undone.`}
        confirmText="Delete"
        destructive
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={() => deleteTarget && deleteCourse.mutate(deleteTarget.id)}
      /> */}
    </div>
  );
};

export default CoursesPage;
