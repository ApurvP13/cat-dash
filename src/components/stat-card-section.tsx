"use client";

import { Calculator, ChartSpline } from "lucide-react";
import { MockTest, SectionalTest } from "@/types/mock-test";
import StatCards from "./stat-cards";

const percentileChart = [
  { percentile: 99.9, marks: 127 },
  { percentile: 99.5, marks: 103.97 },
  { percentile: 99, marks: 95.13 },
  { percentile: 97, marks: 78.9 },
  { percentile: 95, marks: 70 },
  { percentile: 90, marks: 58 },
  { percentile: 80, marks: 44 },
  { percentile: 70, marks: 25.3 },
  { percentile: 60, marks: 19.5 },
];

function getAverage(values: number[]) {
  if (values.length === 0) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

type TrendResult = { subtitle: string; trend: "up" | "down" | "neutral" };

function getTrend(values: number[]): TrendResult {
  if (values.length === 0)
    return { subtitle: "Add data to see stats", trend: "neutral" };
  if (values.length < 5) return { subtitle: "Add more data", trend: "neutral" };

  const last5 = getAverage(values.slice(-5));
  const overall = getAverage(values);
  const diff = parseFloat((last5 - overall).toFixed(1));

  if (diff > 0)
    return { subtitle: `+${diff} as of last 5 scores`, trend: "up" };
  if (diff < 0)
    return { subtitle: `${diff} as of last 5 scores`, trend: "down" };
  return { subtitle: "No change in last 5 scores", trend: "neutral" };
}

function getPredictedPercentile(score: number) {
  if (score === 0) return 0;
  let closest = percentileChart[0];
  for (const entry of percentileChart) {
    if (Math.abs(entry.marks - score) < Math.abs(closest.marks - score)) {
      closest = entry;
    }
  }
  return closest.percentile;
}

type Section = "VARC" | "DILR" | "QA";

function getMockSectionScore(m: MockTest, section: Section) {
  if (section === "VARC") return m.varcScore;
  if (section === "DILR") return m.dilrScore;
  return m.qaScore;
}

export default function StatCardSection({
  mockTests,
  sectionalTests,
}: {
  mockTests: MockTest[];
  sectionalTests: SectionalTest[];
}) {
  // --- Overall Average (Mock only)
  const overallScores = mockTests
    .map((m) => m.overallScore)
    .filter((n) => n != null);
  const overallAvg = getAverage(overallScores);
  const overallTrend = getTrend(overallScores);

  // --- Predicted Percentile (from CAT 2024 data)
  const predictedPercentile = getPredictedPercentile(overallAvg);

  // --- Section Averages (combine sectional + mock)
  const getSectionData = (section: Section) => {
    const fromSectionals = sectionalTests
      .filter((s) => s.section === section)
      .map((s) => s.score)
      .filter((n) => n != null);

    const fromMocks = mockTests
      .map((m) => getMockSectionScore(m, section))
      .filter((n) => n != null);

    const allScores = [...fromSectionals, ...fromMocks];

    const avg = getAverage(allScores);
    const trend = getTrend(allScores);

    return { avg, ...trend };
  };

  const varc = getSectionData("VARC");
  const dilr = getSectionData("DILR");
  const qa = getSectionData("QA");

  // helper to convert to numeric with 1 decimal
  const formatNum = (n: number) => parseFloat(n.toFixed(1));

  return (
    <div className="flex gap-4 w-full">
      <StatCards
        title="Current Average"
        value={formatNum(overallAvg)}
        subtitle={
          overallScores.length === 0
            ? "Add data to see stats"
            : overallTrend.subtitle
        }
        icon={ChartSpline}
        trend={overallTrend.trend}
      />

      <StatCards
        title="Predicted Percentile"
        value={predictedPercentile}
        subtitle={
          overallScores.length === 0
            ? "Add data to see stats"
            : "Using CAT 2024 data"
        }
        icon={Calculator}
        trend="neutral"
      />

      <StatCards
        title="VARC Average"
        value={formatNum(varc.avg)}
        subtitle={varc.subtitle}
        icon={ChartSpline}
        trend={varc.trend}
      />

      <StatCards
        title="DILR Average"
        value={formatNum(dilr.avg)}
        subtitle={dilr.subtitle}
        icon={ChartSpline}
        trend={dilr.trend}
      />

      <StatCards
        title="QA Average"
        value={formatNum(qa.avg)}
        subtitle={qa.subtitle}
        icon={ChartSpline}
        trend={qa.trend}
      />
    </div>
  );
}
