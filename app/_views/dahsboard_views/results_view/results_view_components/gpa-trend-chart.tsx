"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import App_Text from "@/app/_components/app_ui/App_Text";
import { SemesterGPAPoint } from "../results_data/results-computation";

const chartConfig = {
  gpa: {
    label: "GPA",
    color: "hsl(243 75% 59%)",
  },
} satisfies ChartConfig;

const PartialDot = (props: any) => {
  const { cx, cy, payload } = props;
  if (payload.gpa === null) return null;
  return payload.partial ? (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="#fff"
      stroke="var(--color-gpa)"
      strokeWidth={2}
      strokeDasharray="2 2"
    />
  ) : (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="var(--color-gpa)"
      stroke="#fff"
      strokeWidth={2}
    />
  );
};

const GPATrendChart = ({
  points,
  pointScaleMax,
}: {
  points: SemesterGPAPoint[];
  pointScaleMax: number;
}) => {
  const chartData = points.map((p) => ({
    name: p.shortLabel,
    gpa: p.totalCreditUnits > 0 ? p.gpa : null, // null only when nothing at all is graded yet
    partial: p.totalCreditUnits > 0 && !p.isComplete,
  }));

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <App_Text type="cardhead" text="GPA Trend" />
      </div>

      {points.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center gap-2">
          <span className="text-3xl">📈</span>
          <p className="text-sm text-gray-500">
            No graded semesters yet — your trend will appear here.
          </p>
        </div>
      ) : (
        <>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-64 w-full min-w-0"
          >
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="gpaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-gpa)"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-gpa)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f1f4"
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, pointScaleMax]}
                tick={{ fontSize: 12, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                width={32}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, _name, item) =>
                      value === null
                        ? "No results yet"
                        : `GPA ${Number(value).toFixed(2)}${item?.payload?.partial ? " (partial results)" : ""}`
                    }
                  />
                }
              />
              <Area
                type="monotone"
                dataKey="gpa"
                stroke="var(--color-gpa)"
                strokeWidth={2.5}
                fill="url(#gpaFill)"
                dot={<PartialDot />}
                activeDot={{
                  r: 6,
                  fill: "var(--color-gpa)",
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
                connectNulls
              />
            </AreaChart>
          </ChartContainer>
          {chartData.some((d) => d.partial) && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
              <span className="inline-block h-2 w-2 rounded-full border-2 border-dashed border-gray-300" />
              Hollow points reflect partial results — some courses in that
              semester aren't graded yet.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default GPATrendChart;
