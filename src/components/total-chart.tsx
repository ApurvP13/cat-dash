"use client";

import { TrendingUp, LineChart } from "lucide-react";
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
import { MockTest } from "@/types/mock-test";

export const description = "CAT Mock Test Performance Chart";

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

interface TotalChartProps {
  mockTests: MockTest[];
}

const TotalChart: React.FC<TotalChartProps> = ({ mockTests }) => {
  const getImprovementText = (data: MockTest[]) => {
    if (data.length < 2) return "Not enough data to calculate improvement";

    const firstPercentile = data[0].overallPercentile;
    const lastPercentile = data[data.length - 1].overallPercentile;
    const improvement = (
      ((lastPercentile - firstPercentile) / firstPercentile) *
      100
    ).toFixed(2);

    return improvement.startsWith("-")
      ? `Percentile decreased by ${improvement.slice(1)}% since start`
      : `Percentile improved by ${improvement}% since start`;
  };

  function capitalize(str: string) {
    if (typeof str !== "string" || str.length === 0) {
      return "";
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const hasData = mockTests.length > 0;

  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>CAT Mock Test Performance</CardTitle>
        <CardDescription>Full Mocks for CAT 2025 cycle</CardDescription>
      </CardHeader>

      <CardContent>
        {hasData ? (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={mockTests}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => capitalize(value)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="overallScore"
                name="Score"
                fill="oklch(87.1% 0.15 154.449)"
                radius={4}
              />
              <Bar
                dataKey="overallPercentile"
                name="Percentile"
                fill="oklch(85.5% 0.138 181.071)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
            <LineChart className="h-32 w-32 mb-4 text-red-500" />
            <p className="font-semibold text-lg">No Mock Tests Yet</p>
            <p className="text-sm">
              Start tracking your CAT preparation by adding your first mock
              test. Click the + button to get started!
            </p>
          </div>
        )}
      </CardContent>

      {hasData && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            {getImprovementText(mockTests)}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing CAT mock test scores and percentiles for the last 8 months
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default TotalChart;
