"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import App_Button from "@/app/_components/app_ui/App_Button";
import App_Text from "@/app/_components/app_ui/App_Text";
import AddSemesterDialog from "./academic_modals/AddSemesterModal";
import CreateSessionDialog from "./academic_modals/CreateSessionModal";
import { SideCardSkeleton } from "./academic_component/Academic_Skeleton";
import QuickActionsCard from "./academic_component/Quick_Actions_Card";
import SemestersPanel from "./academic_component/Semesters_Panel";
import SessionOverviewCards from "./academic_component/Session_Overview_Cards";
import SessionsTable from "./academic_component/Sessions_Table";
import TipsCard from "./academic_component/Tips_Card";
import {
  useSessions,
  useSemesters,
  useCreateSession,
  useSetActiveSession,
  useDeleteSession,
  useCreateSemester,
  useSetCurrentSemester,
  useDeleteSemester,
} from "./academic_hook/useAcademicApi";
import { AcademicSession, Semester } from "./academic_types";
import EditSessionDialog from "./academic_modals/EditSessionModal";

const SessionsSemestersPage = () => {
  const { data: sessions = [], isLoading: sessionsLoading } = useSessions();
  const { data: semesters = [], isLoading: semestersLoading } = useSemesters();

  const createSession = useCreateSession();
  const setActiveSession = useSetActiveSession();
  const deleteSession = useDeleteSession();
  const createSemester = useCreateSemester();
  const setCurrentSemester = useSetCurrentSemester();
  const deleteSemester = useDeleteSemester();

  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const [createOpen, setCreateOpen] = useState(false);
  const [editSession, setEditSession] = useState<AcademicSession | null>(null);
  const [deleteSessionTarget, setDeleteSessionTarget] =
    useState<AcademicSession | null>(null);
  const [addSemesterOpen, setAddSemesterOpen] = useState(false);
  const [deleteSemesterTarget, setDeleteSemesterTarget] =
    useState<Semester | null>(null);

  // default the selected session to the active one once sessions load
  const effectiveSelectedId =
    selectedSessionId ??
    sessions.find((s) => s.isActive)?.id ??
    sessions[0]?.id ??
    null;
  const selectedSession =
    sessions.find((s) => s.id === effectiveSelectedId) ?? null;
  const semestersForSelected = semesters.filter(
    (s) => s.sessionId === effectiveSelectedId,
  );
  const semestersForDeleteTarget = deleteSessionTarget
    ? semesters.filter((s) => s.sessionId === deleteSessionTarget.id)
    : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <App_Text type="dashTitle" text="Academic Sessions & Semesters" />
          <p className="text-sm text-gray-500 mt-1">
            Create and manage your academic sessions and semesters. All your
            courses are organized by semester.
          </p>
        </div>
        <App_Button
          text="Create New Session"
          icon={<Plus className="h-4 w-4" />}
          btnStyle="bg-primary text-white"
          onClick={() => setCreateOpen(true)}
        />
      </div>

      <SessionOverviewCards
        sessions={sessions}
        semesters={semesters}
        isLoading={sessionsLoading || semestersLoading}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-2 space-y-6">
          <SessionsTable
            sessions={sessions}
            semesters={semesters}
            isLoading={sessionsLoading}
            selectedSessionId={effectiveSelectedId}
            onSelectSession={setSelectedSessionId}
            onCreate={() => setCreateOpen(true)}
            onEdit={setEditSession}
            onDelete={setDeleteSessionTarget}
          />
          <SemestersPanel
            session={selectedSession}
            semesters={semestersForSelected}
            isLoading={semestersLoading}
            onAdd={() => setAddSemesterOpen(true)}
            onEdit={() => {}}
            onDelete={setDeleteSemesterTarget}
            onSetCurrent={(sem) => setCurrentSemester.mutate(sem.id)}
          />
        </div>

        <div className="space-y-6">
          {sessionsLoading ? (
            <SideCardSkeleton />
          ) : (
            <QuickActionsCard
              onCreateSession={() => setCreateOpen(true)}
              onAddSemester={() => setAddSemesterOpen(true)}
            />
          )}
          <TipsCard />
        </div>
      </div>

      <CreateSessionDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        existingSessions={sessions}
        onCreate={async (input) => {
          const created = await createSession.mutateAsync(input);
          setSelectedSessionId(created.id);
        }}
        onGoToSession={() => {}}
      />

      <EditSessionDialog
        session={editSession}
        open={Boolean(editSession)}
        onOpenChange={(open) => !open && setEditSession(null)}
        onSetActive={(id) => setActiveSession.mutateAsync(id).then(() => {})}
      />

      <AddSemesterDialog
        open={addSemesterOpen}
        onOpenChange={setAddSemesterOpen}
        session={selectedSession}
        existingInSession={semestersForSelected}
        onSave={(input) => createSemester.mutateAsync(input).then(() => {})}
      />

      {/* <ConfirmDialog
        open={Boolean(deleteSessionTarget)}
        title="Delete Session"
        description={
          semestersForDeleteTarget.length > 0
            ? `${deleteSessionTarget?.name} has ${semestersForDeleteTarget.length} semester(s) with courses. Deleting it will remove everything underneath. This cannot be undone.`
            : `Are you sure you want to delete ${deleteSessionTarget?.name}? This cannot be undone.`
        }
        confirmText="Delete"
        destructive
        onOpenChange={(open) => !open && setDeleteSessionTarget(null)}
        onConfirm={() =>
          deleteSessionTarget && deleteSession.mutate(deleteSessionTarget.id)
        }
      /> */}

      {/* <ConfirmDialog
        open={Boolean(deleteSemesterTarget)}
        title="Delete Semester"
        description={
          deleteSemesterTarget && deleteSemesterTarget.totalCourses > 0
            ? `${deleteSemesterTarget.name} has ${deleteSemesterTarget.totalCourses} course(s) recorded. Deleting it will remove those too. This cannot be undone.`
            : `Are you sure you want to delete ${deleteSemesterTarget?.name}? This cannot be undone.`
        }
        confirmText="Delete"
        destructive
        onOpenChange={(open) => !open && setDeleteSemesterTarget(null)}
        onConfirm={() =>
          deleteSemesterTarget && deleteSemester.mutate(deleteSemesterTarget.id)
        }
      /> */}
    </div>
  );
};

export default SessionsSemestersPage;
