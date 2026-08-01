import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  ClipboardList,
  Calendar,
  Award,
  CalendarClock,
  CheckSquare,
  NotebookPen,
} from "lucide-react";
import App_Text from "@/app/_components/app_ui/App_Text";

const LINKS = [
  { icon: BookOpen, label: "Courses", href: "/courses" },
  { icon: ClipboardList, label: "Results", href: "/results" },
  {
    icon: Calendar,
    label: "Sessions & Semesters",
    href: "/sessions-semesters",
  },
  { icon: Award, label: "Grading System", href: "/grading-system" },
  { icon: CalendarClock, label: "Timetable", href: null },
  { icon: CheckSquare, label: "Attendance", href: null },
  { icon: NotebookPen, label: "Notes", href: null },
];

const QuickLinksGrid = () => {
  return (
    <div>
      <App_Text type="cardhead" text="Quick Links" />
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 mt-3">
        {LINKS.map((link) => {
          const disabled = !link.href;
          const content = (
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-2 rounded-xl border bg-white p-4 text-center transition-colors",
                disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:border-primary hover:bg-primary/5",
              )}
            >
              <link.icon className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{link.label}</span>
              {disabled && (
                <span className="text-[10px] text-gray-400">Coming soon</span>
              )}
            </div>
          );
          return disabled ? (
            <div key={link.label}>{content}</div>
          ) : (
            <Link key={link.label} href={link.href!}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinksGrid;
