"use client";

import { Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { CheckCircle2 } from "lucide-react";
import App_Text from "@/app/_components/app_ui/App_Text";
import {
  CourseResultRow,
  gpaRemark,
} from "../results_data/results-computation";

const BUCKET_COLORS = [
  "hsl(243 75% 59%)",
  "hsl(24 95% 53%)",
  "hsl(45 93% 47%)",
  "hsl(31 92% 63%)",
  "hsl(0 84% 60%)",
];

const SemesterSummaryDonut = ({
  rows,
  gpa,
  pointScaleMax,
  isComplete,
}: {
  rows: CourseResultRow[];
  gpa: number;
  pointScaleMax: number;
  isComplete: boolean;
}) => {
  const letterCounts = new Map<string, number>();
  rows.forEach((r) => {
    if (!r.letter) return;
    letterCounts.set(r.letter, (letterCounts.get(r.letter) ?? 0) + 1);
  });

  const entries = Array.from(letterCounts.entries());
  const chartData =
    entries.length > 0
      ? entries.map(([name, value]) => ({ name, value }))
      : [{ name: "None", value: 1 }];

  const chartConfig = Object.fromEntries(
    entries.map(([letter], i) => [
      letter,
      { label: letter, color: BUCKET_COLORS[i % BUCKET_COLORS.length] },
    ]),
  ) satisfies ChartConfig;

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <App_Text type="cardhead" text="Semester Summary" />
      <div className="flex items-center gap-4 py-3">
        <ChartContainer
          config={chartConfig}
          className="h-32 w-32 shrink-0 aspect-square"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius="70%"
              outerRadius="100%"
              paddingAngle={entries.length ? 2 : 0}
              stroke="none"
            >
              {chartData.map((entry, i) => (
                <Cell
                  key={entry.name}
                  fill={
                    entries.length
                      ? BUCKET_COLORS[i % BUCKET_COLORS.length]
                      : "#e5e7eb"
                  }
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <ul className="text-sm space-y-1 flex-1">
          {entries.map(([letter, count], i) => (
            <li
              key={letter}
              className="flex items-center justify-between gap-2"
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: BUCKET_COLORS[i % BUCKET_COLORS.length],
                  }}
                />
                {letter}
              </span>
              <span className="text-gray-500">
                {count} {count === 1 ? "course" : "courses"}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {isComplete ? (
        <div className="flex items-center gap-2 rounded-md bg-green-50 p-3 text-sm text-green-700">
          <CheckCircle2 className="h-4 w-4 shrink-0" />{" "}
          {gpaRemark(gpa, pointScaleMax)}
        </div>
      ) : (
        <p className="text-sm text-amber-600 bg-amber-50 rounded-md p-3">
          Some courses in this semester don't have results yet — this summary
          will update once they're entered.
        </p>
      )}
    </div>
  );
};

export default SemesterSummaryDonut;
