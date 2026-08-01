import App_Text from "@/app/_components/app_ui/App_Text";
import {
  Calendar,
  BookOpen,
  Library,
  History,
  ChevronRight,
} from "lucide-react";

const ACTIONS = (handlers: {
  onCreateSession: () => void;
  onAddSemester: () => void;
}) => [
  {
    icon: Calendar,
    label: "Create New Session",
    onClick: handlers.onCreateSession,
  },
  {
    icon: BookOpen,
    label: "Add New Semester",
    onClick: handlers.onAddSemester,
  },
  {
    icon: Library,
    label: "Add Course to Semester",
    onClick: undefined,
    disabled: true,
  }, // TODO: wire once Courses feature exists
  {
    icon: History,
    label: "View Academic History",
    onClick: undefined,
    disabled: true,
  },
];

const QuickActionsCard = ({
  onCreateSession,
  onAddSemester,
}: {
  onCreateSession: () => void;
  onAddSemester: () => void;
}) => {
  return (
    <div className="rounded-xl border bg-white p-4">
      <App_Text type="cardhead" text="Quick Actions" />
      <div className="mt-2 divide-y">
        {ACTIONS({ onCreateSession, onAddSemester }).map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            disabled={!action.onClick}
            className="flex w-full items-center justify-between py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:text-primary"
          >
            <span className="flex items-center gap-2">
              <action.icon className="h-4 w-4" /> {action.label}
            </span>
            <ChevronRight className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsCard;
