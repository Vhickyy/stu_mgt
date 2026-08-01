import Link from "next/link";
import { cn } from "@/lib/utils";
import App_Text from "@/app/_components/app_ui/App_Text";
import { CourseResultRow } from "../../results_view/results_data/results-computation";

const RecentGradesCard = ({ rows }: { rows: CourseResultRow[] }) => {
  const graded = rows.filter((r) => r.letter !== null).slice(0, 5);

  return (
    <div className="rounded-xl border bg-white p-4">
      <div className="flex items-center justify-between">
        <App_Text type="dashCard" text="Recent Grades" />
        <Link href="/results" className="text-sm text-primary hover:underline">
          View all
        </Link>
      </div>
      {graded.length === 0 ? (
        <p className="text-sm text-gray-500 py-6 text-center">
          No grades recorded yet this semester.
        </p>
      ) : (
        <div className="mt-2 divide-y">
          {graded.map((r) => (
            <div
              key={r.course.id}
              className="flex items-center justify-between py-2.5 text-sm"
            >
              <div>
                <p className="font-medium">{r.course.code}</p>
                <p className="text-xs text-gray-500 truncate max-w-45">
                  {r.course.title}
                </p>
              </div>
              <span
                className={cn(
                  "font-semibold",
                  r.letter === "F" ? "text-red-600" : "text-gray-700",
                )}
              >
                {r.letter}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentGradesCard;
