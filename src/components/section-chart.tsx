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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const description = "CAT Sectional Performance Chart";

// Mock data for each section
const sectionData = {
  VARC: [
    { test: "Simcat 1", score: 45, percentile: 78 },
    { test: "Simcat 2", score: 52, percentile: 85 },
    { test: "Simcat 3", score: 38, percentile: 65 },
    { test: "Simcat 4", score: 58, percentile: 92 },
    { test: "Simcat 5", score: 48, percentile: 80 },
    { test: "Simcat 6", score: 55, percentile: 88 },
    { test: "Simcat 7", score: 62, percentile: 95 },
    { test: "Simcat 8", score: 50, percentile: 82 },
  ],
  DILR: [
    { test: "Simcat 1", score: 42, percentile: 72 },
    { test: "Simcat 2", score: 38, percentile: 68 },
    { test: "Simcat 3", score: 48, percentile: 82 },
    { test: "Simcat 4", score: 45, percentile: 76 },
    { test: "Simcat 5", score: 52, percentile: 88 },
    { test: "Simcat 6", score: 46, percentile: 78 },
    { test: "Simcat 7", score: 55, percentile: 91 },
    { test: "Simcat 8", score: 49, percentile: 84 },
  ],
  QA: [
    { test: "Simcat 1", score: 58, percentile: 89 },
    { test: "Simcat 2", score: 72, percentile: 96 },
    { test: "Simcat 3", score: 52, percentile: 81 },
    { test: "Simcat 4", score: 72, percentile: 96 },
    { test: "Simcat 5", score: 58, percentile: 85 },
    { test: "Simcat 6", score: 68, percentile: 94 },
    { test: "Simcat 7", score: 65, percentile: 91 },
    { test: "Simcat 8", score: 57, percentile: 83 },
  ],
};

type Section = keyof typeof sectionData;

const sectionColors = {
  VARC: {
    score: "oklch(75% 0.183 55.934)", // Orange
    percentile: "oklch(83.7% 0.128 66.29)", // Light Orange
  },
  DILR: {
    score: "oklch(84.1% 0.238 128.85)", // Lime
    percentile: "oklch(89.7% 0.196 126.665)", // Light Lime
  },
  QA: {
    score: "oklch(74.6% 0.16 232.661)", // sky
    percentile: "oklch(82.8% 0.111 230.318)", // light sky
  },
};

const getSectionTitle = (section: Section) => {
  const titles = {
    VARC: "Verbal Ability & Reading Comprehension",
    DILR: "Data Interpretation & Logical Reasoning",
    QA: "Quantitative Aptitude",
  };
  return titles[section];
};

const getImprovementText = (section: Section) => {
  const data = sectionData[section];
  const firstPercentile = data[0].percentile;
  const lastPercentile = data[data.length - 1].percentile;
  const improvement = (
    ((lastPercentile - firstPercentile) / firstPercentile) *
    100
  ).toFixed(1);

  return improvement.startsWith("-")
    ? `Percentile decreased by ${improvement.slice(1)}% since start`
    : `Percentile improved by ${improvement}% since start`;
};

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

const SectionChart = ({ section }: { section: Section }) => {
  const currentData = sectionData[section];
  const currentColors = sectionColors[section];

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>CAT Sectional Performance - {section}</CardTitle>
        <CardDescription>{getSectionTitle(section)}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={currentData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="test"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.replace("Simcat ", "S")}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="score" fill={currentColors.score} radius={4} />
            <Bar
              dataKey="percentile"
              fill={currentColors.percentile}
              radius={4}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          {getImprovementText(section)} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing {section} scores and percentiles across 8 mock tests
        </div>
      </CardFooter>
    </Card>
  );
};

export function SectionalChart() {
  return (
    <div className="w-1/2">
      <Tabs defaultValue="VARC">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="VARC">VARC</TabsTrigger>
          <TabsTrigger value="DILR">DILR</TabsTrigger>
          <TabsTrigger value="QA">QA</TabsTrigger>
        </TabsList>
        <TabsContent value="VARC">
          <SectionChart section="VARC" />
        </TabsContent>
        <TabsContent value="DILR">
          <SectionChart section="DILR" />
        </TabsContent>
        <TabsContent value="QA">
          <SectionChart section="QA" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
