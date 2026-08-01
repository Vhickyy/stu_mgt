import App_Text from "@/app/_components/app_ui/App_Text";
import { Semester } from "../../academic_record_view/academic_types";

const SemesterProgressCard = ({
  semester,
  progress,
}: {
  semester: Semester | null;
  progress: number | null;
}) => {
  return (
    <div className="rounded-xl border bg-white p-4">
      <App_Text type="dashCard" text="Semester Progress" />
      {!semester || progress === null ? (
        <p className="text-sm text-gray-500 mt-3">
          No active semester to track.
        </p>
      ) : (
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              {new Date(semester.startDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}{" "}
              –{" "}
              {new Date(semester.endDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-linear-to-r from-primary to-purple-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SemesterProgressCard;
