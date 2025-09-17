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
import { SectionalTest } from "@/types/mock-test";

type Section = "VARC" | "DILR" | "QA";

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
    score: "oklch(74.6% 0.16 232.661)", // Sky
    percentile: "oklch(82.8% 0.111 230.318)", // Light Sky
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

const getImprovementText = (data: SectionalTest[]) => {
  if (data.length < 2) return "Not enough data to calculate improvement";

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

const SectionChart = ({
  section,
  data,
}: {
  section: Section;
  data: SectionalTest[];
}) => {
  const currentData = data.filter((t) => t.section === section);
  const currentColors = sectionColors[section];

  return (
    <Card>
      <CardHeader>
        <CardTitle>CAT Sectional Performance - {section}</CardTitle>
        <CardDescription>{getSectionTitle(section)}</CardDescription>
      </CardHeader>
      <CardContent>
        {currentData.length === 0 ? (
          <div className="flex h-48 items-center justify-center text-muted-foreground">
            No data available for {section}.
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={currentData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
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
        )}
      </CardContent>
      {currentData.length > 0 && (
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            {getImprovementText(currentData)} <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing {section} scores and percentiles across {currentData.length}{" "}
            tests
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export function SectionalChart({
  sectionalTests,
}: {
  sectionalTests: SectionalTest[];
}) {
  return (
    <div className="w-1/2">
      <Tabs defaultValue="VARC">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="VARC">VARC</TabsTrigger>
          <TabsTrigger value="DILR">DILR</TabsTrigger>
          <TabsTrigger value="QA">QA</TabsTrigger>
        </TabsList>
        <TabsContent value="VARC">
          <SectionChart section="VARC" data={sectionalTests} />
        </TabsContent>
        <TabsContent value="DILR">
          <SectionChart section="DILR" data={sectionalTests} />
        </TabsContent>
        <TabsContent value="QA">
          <SectionChart section="QA" data={sectionalTests} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
