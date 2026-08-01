"use client";

import App_Text from "@/app/_components/app_ui/App_Text";
import { GRADE_BUCKETS, bucketOf } from "../gpa_data/gpa_data";
import { ScaleType, ICourse } from "../gpa_types";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const BUCKET_RANGES: Record<ScaleType, Record<string, string>> = {
  "5.0": {
    A: "4.5 - 5.0",
    B: "3.5 - 4.49",
    C: "2.5 - 3.49",
    D: "1.5 - 2.49",
    F: "0 - 1.49",
  },
  "4.0": {
    A: "3.5 - 4.0",
    B: "2.8 - 3.49",
    C: "2.0 - 2.79",
    D: "1.0 - 1.99",
    F: "0 - 0.99",
  },
};

const BUCKET_COLORS: Record<string, string> = {
  A: "hsl(243 75% 59%)",
  B: "hsl(24 95% 53%)",
  C: "hsl(45 93% 47%)",
  D: "hsl(31 92% 63%)",
  F: "hsl(0 84% 60%)",
};

const chartConfig = Object.fromEntries(
  GRADE_BUCKETS.map((b) => [b, { label: b, color: BUCKET_COLORS[b] }]),
) satisfies ChartConfig;

const GPABreakdown = ({
  courses,
  scale,
  gpa,
}: {
  courses: ICourse[];
  scale: ScaleType;
  gpa: number;
}) => {
  const counts = GRADE_BUCKETS.map((b) => ({
    name: b,
    value: courses.filter((c) => bucketOf(c.grade) === b).length,
  }));
  const hasCourses = courses.length > 0;
  const chartData = hasCourses
    ? counts.filter((c) => c.value > 0)
    : [{ name: "None", value: 1 }];

  return (
    <div className="rounded-xl border bg-white p-4">
      <App_Text type="cardhead" text="GPA Breakdown" />
      <div className="flex items-center gap-4 mt-2">
        <div className="relative h-36 w-36 shrink-0">
          <ChartContainer
            config={chartConfig}
            className="h-36 w-36 shrink-0 aspect-square"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius="70%"
                outerRadius="100%"
                paddingAngle={hasCourses ? 2 : 0}
                stroke="none"
              >
                {chartData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={hasCourses ? BUCKET_COLORS[entry.name] : "#e5e7eb"}
                  />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold">
              {hasCourses ? gpa.toFixed(2) : "—"}
            </span>
            <span className="text-xs text-gray-500">GPA</span>
          </div>
        </div>

        <ul
          className="text-sm space-y-1.5 flex-1"
          aria-label="Grade distribution"
        >
          {counts.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between gap-2"
            >
              <span className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: BUCKET_COLORS[c.name] }}
                />
                {c.name} ({BUCKET_RANGES[scale][c.name]})
              </span>
              <span className="text-gray-500">
                {c.value} {c.value === 1 ? "course" : "courses"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 rounded-md bg-gray-50 p-3">
        <p className="text-sm font-semibold mb-1">How GPA is calculated</p>
        <p className="text-sm text-gray-600">
          GPA = Total Grade Points ÷ Total Credit Units
        </p>
      </div>

      <div className="mt-3 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
        Tip: Add all courses for the semester and ensure grades are correct for
        accurate calculation.
      </div>
    </div>
  );
};

export default GPABreakdown;
