import Link from "next/link";
import { AlertTriangle } from "lucide-react";

const ResultsNudgeBanner = ({ pendingCount }: { pendingCount: number }) => {
  if (pendingCount === 0) return null;

  return (
    <Link
      href="/results"
      className="flex items-center justify-between gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 hover:bg-amber-100 transition-colors"
    >
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0" />
        <p className="text-sm text-amber-800">
          <span className="font-semibold">
            {pendingCount} course{pendingCount > 1 ? "s" : ""}
          </span>{" "}
          this semester {pendingCount > 1 ? "don't" : "doesn't"} have results
          yet — your GPA won't be accurate until they're entered.
        </p>
      </div>
      <span className="text-sm font-medium text-amber-700 whitespace-nowrap">
        Enter now →
      </span>
    </Link>
  );
};

export default ResultsNudgeBanner;
