"use client";

import DataTable from "@/components/data-table";
import Header from "@/components/header";
import { SectionalChart } from "@/components/section-chart";
import StatCards from "@/components/stat-cards";
import { TotalChart } from "@/components/total-chart";
import { Calculator, ChartSpline, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { AddMockDialog } from "@/components/add-mocks";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { MockTest, SectionalTest } from "@/types/mock-test";
import { toast } from "sonner";

export default function Home() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [mockTests, setMockTests] = useLocalStorage<MockTest[]>(
    "cat-mock-tests",
    []
  );
  const [sectionalTests, setSectionalTests] = useLocalStorage<SectionalTest[]>(
    "cat-sectional-tests",
    []
  );

  const handleAddMock = (mockTest: Omit<MockTest, "id">) => {
    const newMock: MockTest = {
      ...mockTest,
      id: Date.now().toString(),
    };
    setMockTests((prev) => [...prev, newMock]);

    toast("Mock Test Added", {
      description: `${mockTest.name} has been successfully added to your tracker.`,
    });
  };

  const handleAddSectional = (sectionalTest: Omit<SectionalTest, "id">) => {
    const newSectional: SectionalTest = {
      ...sectionalTest,
      id: Date.now().toString(),
    };

    setSectionalTests((prev) => [...prev, newSectional]);

    toast("Sectional Test Added", {
      description: `${sectionalTest.name} has been successfully added to your tracker.`,
    });
  };

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
          subtitle={"Using CAT 2024 data"}
          icon={Calculator}
          trend="neutral"
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
      <div className="w-full">
        <Card className="">
          <CardHeader>
            <CardTitle>CAT Mocks</CardTitle>
            <CardDescription>Data of the current mocks given.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable />
          </CardContent>
        </Card>
      </div>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Add Mock Dialog */}
      <AddMockDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAddMock={handleAddMock}
        onAddSectional={handleAddSectional}
      />
    </div>
  );
}
