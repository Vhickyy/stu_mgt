import { RangedGrade } from "../grading_types";

const COLORS = [
  "#6366f1",
  "#f97316",
  "#eab308",
  "#fb923c",
  "#ef4444",
  "#0ea5e9",
  "#10b981",
];

const CoverageBar = ({
  ranges,
  scaleMax,
}: {
  ranges: RangedGrade[];
  scaleMax: number;
}) => {
  if (scaleMax <= 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex h-4 w-full overflow-hidden rounded-full border bg-gray-100">
        {[...ranges].reverse().map((r, i) => {
          const width = ((r.max - r.min) / scaleMax) * 100;
          return (
            <div
              key={r.id}
              style={{
                width: `${Math.max(width, 0)}%`,
                backgroundColor: COLORS[i % COLORS.length],
              }}
              title={`${r.letter}: ${r.min} - ${r.max}`}
            />
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-gray-400">
        <span>0</span>
        <span>{scaleMax}</span>
      </div>
    </div>
  );
};

export default CoverageBar;
