"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  Building,
  BookOpen,
  Calculator,
  BarChart3,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import type { MockTest, SectionalTest } from "@/types/mock-test";

interface AddMockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMock: (mockTest: Omit<MockTest, "id">) => void;
  onAddSectional: (sectionalTest: Omit<SectionalTest, "id">) => void;
}

export function AddMockDialog({
  open,
  onOpenChange,
  onAddMock,
  onAddSectional,
}: AddMockDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  // Full Mock Form Data
  const [fullMockData, setFullMockData] = useState({
    name: "",
    institute: "" as MockTest["institute"] | "",
    overallScore: "",
    overallPercentile: "",
    varcScore: "",
    varcPercentile: "",
    dilrScore: "",
    dilrPercentile: "",
    qaScore: "",
    qaPercentile: "",
  });

  // Sectional Mock Form Data
  const [sectionalData, setSectionalData] = useState({
    name: "",
    section: "",
    score: "",
    percentile: "",
  });

  const handleFullMockChange = (field: string, value: string) => {
    setFullMockData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSectionalChange = (field: string, value: string) => {
    setSectionalData((prev) => ({ ...prev, [field]: value }));
  };

  const validateFullMock = () => {
    const requiredFields = [
      "name",
      "institute",
      "overallScore",
      "overallPercentile",
      "varcScore",
      "varcPercentile",
      "dilrScore",
      "dilrPercentile",
      "qaScore",
      "qaPercentile",
    ];

    for (const field of requiredFields) {
      if (!fullMockData[field as keyof typeof fullMockData]) {
        alert("Please fill in all required fields.");
        return false;
      }
    }

    // Validate score ranges
    const overallScore = Number(fullMockData.overallScore);
    const varcScore = Number(fullMockData.varcScore);
    const dilrScore = Number(fullMockData.dilrScore);
    const qaScore = Number(fullMockData.qaScore);

    if (overallScore < 0 || overallScore > 204) {
      alert("Overall score must be between 0 and 204.");
      return false;
    }
    if (varcScore < 0 || varcScore > 72) {
      alert("VARC score must be between 0 and 72.");
      return false;
    }
    if (dilrScore < 0 || dilrScore > 60) {
      alert("DILR score must be between 0 and 60.");
      return false;
    }
    if (qaScore < 0 || qaScore > 66) {
      alert("QA score must be between 0 and 66.");
      return false;
    }

    return true;
  };

  const validateSectional = () => {
    if (
      !sectionalData.name ||
      !sectionalData.section ||
      !sectionalData.score ||
      !sectionalData.percentile
    ) {
      alert("Please fill in all required fields.");
      return false;
    }

    const score = Number(sectionalData.score);
    const maxScores = { VARC: 72, DILR: 60, QA: 66 };
    const maxScore = maxScores[sectionalData.section as keyof typeof maxScores];

    if (score < 0 || score > maxScore) {
      alert(
        `${sectionalData.section} score must be between 0 and ${maxScore}.`
      );
      return false;
    }

    const percentile = Number(sectionalData.percentile);
    if (percentile < 0 || percentile > 100) {
      alert("Percentile must be between 0 and 100.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    type: "full" | "sectional"
  ) => {
    e.preventDefault();

    const isValid = type === "full" ? validateFullMock() : validateSectional();
    if (!isValid) return;

    setIsSubmitting(true);

    try {
      if (type === "full") {
        const mockTest: MockTest = {
          id: Date.now().toString(),
          name: fullMockData.name,
          institute: fullMockData.institute as MockTest["institute"],
          dateTaken: date.toISOString().split("T")[0],
          overallScore: Number(fullMockData.overallScore),
          overallPercentile: Number(fullMockData.overallPercentile),
          varcScore: Number(fullMockData.varcScore),
          varcPercentile: Number(fullMockData.varcPercentile),
          dilrScore: Number(fullMockData.dilrScore),
          dilrPercentile: Number(fullMockData.dilrPercentile),
          qaScore: Number(fullMockData.qaScore),
          qaPercentile: Number(fullMockData.qaPercentile),
        };
        onAddMock(mockTest);
        setFullMockData({
          name: "",
          institute: "",
          overallScore: "",
          overallPercentile: "",
          varcScore: "",
          varcPercentile: "",
          dilrScore: "",
          dilrPercentile: "",
          qaScore: "",
          qaPercentile: "",
        });
      } else {
        const sectionalTest: SectionalTest = {
          id: Date.now().toString(),
          type: "sectional",
          name: sectionalData.name,
          section: sectionalData.section,
          score: Number(sectionalData.score),
          percentile: Number(sectionalData.percentile),
          dateTaken: date.toISOString().split("T")[0],
        };
        onAddSectional(sectionalTest);
        setSectionalData({ name: "", section: "", score: "", percentile: "" });
      }

      setDate(new Date());
      onOpenChange(false);
    } catch (error) {
      alert("Failed to add mock test. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Add New Mock Test
          </DialogTitle>
          <DialogDescription>
            Choose between full mock or sectional test to track your CAT
            preparation progress.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="full" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="full" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Full Mock
            </TabsTrigger>
            <TabsTrigger value="sectional" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Sectional
            </TabsTrigger>
          </TabsList>

          <TabsContent value="full" className="mt-6">
            <form
              onSubmit={(e) => handleSubmit(e, "full")}
              className="space-y-6"
            >
              {/* Basic Information */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Mock Test Name *</Label>
                  <Input
                    id="full-name"
                    placeholder="e.g., CAT Mock Test 15"
                    value={fullMockData.name}
                    onChange={(e) =>
                      handleFullMockChange("name", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Institute *</Label>
                    <Select
                      value={fullMockData.institute}
                      onValueChange={(value) =>
                        handleFullMockChange("institute", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select institute">
                          {fullMockData.institute && (
                            <div className="flex items-center gap-2">
                              <Building className="h-4 w-4" />
                              {fullMockData.institute}
                            </div>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="TIME">TIME</SelectItem>
                        <SelectItem value="IMS">IMS</SelectItem>
                        <SelectItem value="CatKing">CatKing</SelectItem>
                        <SelectItem value="CL">Career Launcher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Taken *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(date) => date && setDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* Overall Performance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <BarChart3 className="h-4 w-4" />
                  Overall Performance
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Overall Score * (0-204)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="204"
                      placeholder="e.g., 125"
                      value={fullMockData.overallScore}
                      onChange={(e) =>
                        handleFullMockChange("overallScore", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Overall Percentile * (0-100)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="e.g., 99.5"
                      value={fullMockData.overallPercentile}
                      onChange={(e) =>
                        handleFullMockChange(
                          "overallPercentile",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>
                </div>
              </motion.div>

              {/* VARC Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <BookOpen className="h-4 w-4" />
                  VARC (Verbal Ability & Reading Comprehension)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>VARC Score * (0-72)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="72"
                      placeholder="e.g., 60"
                      value={fullMockData.varcScore}
                      onChange={(e) =>
                        handleFullMockChange("varcScore", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>VARC Percentile * (0-100)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="e.g., 99.9"
                      value={fullMockData.varcPercentile}
                      onChange={(e) =>
                        handleFullMockChange("varcPercentile", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </motion.div>

              {/* DILR Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Calculator className="h-4 w-4" />
                  DILR (Data Interpretation & Logical Reasoning)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>DILR Score * (0-60)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="60"
                      placeholder="e.g., 45"
                      value={fullMockData.dilrScore}
                      onChange={(e) =>
                        handleFullMockChange("dilrScore", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>DILR Percentile * (0-100)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="e.g., 99.2"
                      value={fullMockData.dilrPercentile}
                      onChange={(e) =>
                        handleFullMockChange("dilrPercentile", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </motion.div>

              {/* QA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Calculator className="h-4 w-4" />
                  QA (Quantitative Ability)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>QA Score * (0-66)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="66"
                      placeholder="e.g., 55"
                      value={fullMockData.qaScore}
                      onChange={(e) =>
                        handleFullMockChange("qaScore", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>QA Percentile * (0-100)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="e.g., 99.1"
                      value={fullMockData.qaPercentile}
                      onChange={(e) =>
                        handleFullMockChange("qaPercentile", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </motion.div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Full Mock"}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>

          <TabsContent value="sectional" className="mt-6">
            <form
              onSubmit={(e) => handleSubmit(e, "sectional")}
              className="space-y-6"
            >
              {/* Sectional Basic Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Sectional Test Name *</Label>
                  <Input
                    placeholder="e.g., VARC Sectional Test 5"
                    value={sectionalData.name}
                    onChange={(e) =>
                      handleSectionalChange("name", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Section *</Label>
                    <Select
                      value={sectionalData.section}
                      onValueChange={(value) =>
                        handleSectionalChange("section", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VARC">VARC (Max: 72)</SelectItem>
                        <SelectItem value="DILR">DILR (Max: 60)</SelectItem>
                        <SelectItem value="QA">QA (Max: 66)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Date Taken *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={(date) => date && setDate(date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* Sectional Performance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Target className="h-4 w-4" />
                  Section Performance
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Score *</Label>
                    <Input
                      type="number"
                      placeholder={`Max: ${
                        sectionalData.section === "VARC"
                          ? "72"
                          : sectionalData.section === "DILR"
                          ? "66"
                          : "66"
                      }`}
                      value={sectionalData.score}
                      onChange={(e) =>
                        handleSectionalChange("score", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Percentile * (0-100)</Label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      placeholder="e.g., 99.5"
                      value={sectionalData.percentile}
                      onChange={(e) =>
                        handleSectionalChange("percentile", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
              </motion.div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Sectional Test"}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
