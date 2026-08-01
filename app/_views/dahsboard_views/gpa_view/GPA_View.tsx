"use client";

import { useState } from "react";
import { RotateCcw, Plus } from "lucide-react";
import App_Button from "@/app/_components/app_ui/App_Button";
import App_Text from "@/app/_components/app_ui/App_Text";
import { useGPACalculator } from "./gpa_hooks/useGpaCalculator";
import { ICourse } from "./gpa_types";
import GPABreakdown from "./gpa_view_components/GPA_Breakdown";
import CoursesTable from "./gpa_view_components/GPA_Courses_Table";
import GPASummaryCards from "./gpa_view_components/GPA_Summary_Cards";
import GpaScaleSwitcher from "./gpa_view_components/GPA_Scale_Switcher";
import AddCourseDialog from "./gpa_modals/Add_Course_Modal";
import GPA_Main from "./gpa_view_components/GPA_Main";

const GPACalculatorPage = () => {
  const {
    scale,
    setScale,
    courses,
    stats,
    cgpa,
    addCourse,
    updateCourse,
    removeCourse,
    reset,
    isDuplicateCode,
  } = useGPACalculator();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<ICourse | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ICourse | null>(null);
  const [resetOpen, setResetOpen] = useState(false);

  const openAddDialog = () => {
    setEditingCourse(null);
    setDialogOpen(true);
  };

  const openEditDialog = (course: ICourse) => {
    setEditingCourse(course);
    setDialogOpen(true);
  };

  const handleSave = (course: Omit<ICourse, "id">) => {
    if (editingCourse) {
      updateCourse(editingCourse.id, course);
    } else {
      addCourse(course);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <App_Text type="dashTitle" text="GPA Calculator" />
          <p className="text-sm text-gray-500 mt-1">
            Calculate your GPA and CGPA easily. Add your courses, grades and
            credit units.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <GpaScaleSwitcher value={scale} onChange={setScale} />
          <App_Button
            text="Reset"
            icon={<RotateCcw className="h-4 w-4" />}
            btnStyle="bg-white border text-gray-700 hover:bg-gray-50"
            onClick={() => setResetOpen(true)}
            disabled={courses.length === 0}
          />
          <App_Button
            text="Add Course"
            icon={<Plus className="h-4 w-4" />}
            btnStyle="bg-primary text-white"
            onClick={openAddDialog}
          />
        </div>
      </div>

      <GPASummaryCards
        scale={scale}
        gpa={stats.gpa}
        totalCreditUnits={stats.totalCreditUnits}
        totalGradePoints={stats.totalGradePoints}
        cgpa={cgpa}
        hasCourses={courses.length > 0}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-2">
          <CoursesTable
            courses={courses}
            scale={scale}
            onEdit={openEditDialog}
            onDelete={setDeleteTarget}
            onAddCourse={openAddDialog}
            totalCreditUnits={stats.totalCreditUnits}
            totalPoints={stats.totalGradePoints}
          />
        </div>
        <GPABreakdown courses={courses} scale={scale} gpa={stats.gpa} />
        {/* <GPA_Main /> */}
      </div>

      <AddCourseDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        scale={scale}
        onSave={handleSave}
        isDuplicate={isDuplicateCode}
        editingCourse={editingCourse}
      />

      {/* <ConfirmDialog
        open={Boolean(deleteTarget)}
        title="Delete Course"
        description={`Are you sure you want to delete ${deleteTarget?.code} - ${deleteTarget?.title}? This action cannot be undone.`}
        confirmText="Delete"
        destructive
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={() => deleteTarget && removeCourse(deleteTarget.id)}
      />

      <ConfirmDialog
        open={resetOpen}
        title="Reset Semester"
        description="This will remove all courses added for this semester. This action cannot be undone."
        confirmText="Reset"
        destructive
        onOpenChange={setResetOpen}
        onConfirm={reset}
      /> */}
    </div>
  );
};

export default GPACalculatorPage;
