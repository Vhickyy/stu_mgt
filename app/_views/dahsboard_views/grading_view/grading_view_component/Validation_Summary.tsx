import { CheckCircle2, AlertTriangle } from "lucide-react";

const ValidationSummary = ({
  errors,
  scaleMax,
}: {
  errors: string[];
  scaleMax: number;
}) => {
  if (errors.length === 0) {
    return (
      <div className="flex items-start gap-2 rounded-md bg-green-50 p-3 text-sm text-green-700">
        <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
        <span>
          Your grading system covers 0 – {scaleMax} with no gaps or overlaps.
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
      <div className="flex items-center gap-2 font-medium mb-1">
        <AlertTriangle className="h-4 w-4" />
        Fix the following before saving
      </div>
      <ul className="list-disc pl-5 space-y-0.5">
        {errors.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
    </div>
  );
};

export default ValidationSummary;
