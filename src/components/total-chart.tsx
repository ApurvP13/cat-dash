"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "CAT Mock Test Performance Chart";

const chartData = [
  { month: "Simcat 1", score: 145, percentile: 85 },
  { month: "Simcat 2", score: 162, percentile: 92 },
  { month: "Simcat 3", score: 138, percentile: 78 },
  { month: "Simcat 4", score: 175, percentile: 95 },
  { month: "Simcat 5", score: 158, percentile: 88 },
  { month: "Simcat 6", score: 169, percentile: 94 },
  { month: "Simcat 7", score: 182, percentile: 97 },
  { month: "Simcat 8", score: 156, percentile: 86 },
];

const chartConfig = {
  score: {
    label: "Score",
    color: "var(--chart-1)",
  },
  percentile: {
    label: "Percentile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function TotalChart() {
  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>CAT Mock Test Performance</CardTitle>
        <CardDescription>January - Sept 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="score" fill="oklch(87.1% 0.15 154.449)" radius={4} />
            <Bar
              dataKey="percentile"
              fill="oklch(85.5% 0.138 181.071)"
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Average percentile improved by 12% this semester{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing CAT mock test scores and percentiles for the last 8 months
        </div>
      </CardFooter>
    </Card>
  );
}
