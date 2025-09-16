import Header from "@/components/header";
import { SectionalChart } from "@/components/section-chart";
import StatCards from "@/components/stat-cards";
import { TotalChart } from "@/components/total-chart";
import { Calculator, ChartSpline } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col gap-6 p-4">
      {/* Header */}
      <Header />
      {/* Stat cards flex */}
      <div className="flex gap-4 w-full">
        <StatCards
          title={"Current Average"}
          value={104.2}
          subtitle={"+5 as of last 5 scores"}
          icon={ChartSpline}
          trend="up"
        />
        <StatCards
          title={"Predicted Percentile"}
          value={99.84}
          subtitle={"+0.4 as of last 5 scores"}
          icon={Calculator}
          trend="up"
        />
        <StatCards
          title={"VARC Average"}
          value={58}
          subtitle={"-2 as of last 5 scores"}
          icon={ChartSpline}
          trend="down"
        />
        <StatCards
          title={"DILR Average"}
          value={32}
          subtitle={"+2 as of last 5 scores"}
          icon={ChartSpline}
          trend="up"
        />
        <StatCards
          title={"QA Average"}
          value={27}
          subtitle={"+2 as of last 5 scores"}
          icon={ChartSpline}
          trend="up"
        />
      </div>
      {/* Charts for total and sections */}
      <div className="w-full flex gap-4">
        <TotalChart />
        <SectionalChart />
      </div>

      {/* rows of mock data */}
      <div className=""></div>
    </div>
  );
}
