import App_Text from "@/app/_components/app_ui/App_Text";
import { ChevronRight, Download } from "lucide-react";
import { SemesterGPAPoint } from "../results_data/results-computation";

const PreviousSemestersList = ({
  points,
  currentSemesterId,
  onSelect,
}: {
  points: SemesterGPAPoint[];
  currentSemesterId: string | null;
  onSelect: (semesterId: string) => void;
}) => {
  const previous = [...points]
    .reverse()
    .filter((p) => p.semesterId !== currentSemesterId);

  return (
    <div className="rounded-xl border bg-white p-4">
      <App_Text type="cardhead" text="Previous Semesters" />
      {previous.length === 0 ? (
        <p className="text-sm text-gray-500 py-6 text-center">
          No previous semesters yet.
        </p>
      ) : (
        <div className="mt-2 divide-y">
          {previous.map((p) => (
            <button
              key={p.semesterId}
              onClick={() => onSelect(p.semesterId)}
              className="flex w-full items-center justify-between py-3 text-left hover:text-primary"
            >
              <div>
                <p className="text-sm font-medium">{p.label}</p>
                <p className="text-xs text-gray-500">
                  GPA: {p.isComplete ? p.gpa.toFixed(2) : "Incomplete"}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </button>
          ))}
        </div>
      )}
      <button
        disabled
        title="Coming soon"
        className="mt-3 flex items-center justify-center gap-2 w-full rounded-md border p-2 text-sm text-gray-400 cursor-not-allowed"
      >
        <Download className="h-4 w-4" /> View Transcript
      </button>
    </div>
  );
};

export default PreviousSemestersList;
