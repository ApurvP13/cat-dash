"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Building, Calendar, Trash2 } from "lucide-react";
import { MockTest, SectionalTest } from "@/types/mock-test";

// Union type for table data
type TestData = MockTest | SectionalTest;

// Props interface
interface DataTableProps {
  mockTests: MockTest[];
  setMockTests: (tests: MockTest[]) => void;
  sectionalTests: SectionalTest[];
  setSectionalTests: (tests: SectionalTest[]) => void;
}

// Type guards
const isMockTest = (test: TestData): test is MockTest => {
  return !("type" in test);
};

const isSectionalTest = (test: TestData): test is SectionalTest => {
  return "type" in test && test.type === "sectional";
};

// Type for sorting fields
type SortField = "name" | "dateTaken" | "overallScore" | "score";
type SortDirection = "asc" | "desc";

const DataTable: React.FC<DataTableProps> = ({
  mockTests,
  setMockTests,
  sectionalTests,
  setSectionalTests,
}) => {
  // State for sorting
  const [sortField, setSortField] = useState<SortField>("dateTaken");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Combine and transform data for table display
  const combinedData: TestData[] = useMemo(() => {
    return [...mockTests, ...sectionalTests];
  }, [mockTests, sectionalTests]);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Handle delete functions
  const handleDeleteMock = (id: string) => {
    setMockTests(mockTests.filter((mock) => mock.id !== id));
  };

  const handleDeleteSectional = (id: string) => {
    setSectionalTests(
      sectionalTests.filter((sectional) => sectional.id !== id)
    );
  };

  const handleDelete = (test: TestData) => {
    if (isMockTest(test)) {
      handleDeleteMock(test.id);
    } else if (isSectionalTest(test)) {
      handleDeleteSectional(test.id);
    }
  };

  // Sort the data
  const sortedTests = useMemo(() => {
    return [...combinedData].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case "name":
          aValue = a.name;
          bValue = b.name;
          break;
        case "dateTaken":
          aValue = a.dateTaken;
          bValue = b.dateTaken;
          break;
        case "overallScore":
          aValue = isMockTest(a) ? a.overallScore : 0;
          bValue = isMockTest(b) ? b.overallScore : 0;
          break;
        case "score":
          aValue = isSectionalTest(a) ? a.score : 0;
          bValue = isSectionalTest(b) ? b.score : 0;
          break;
        default:
          return 0;
      }

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [combinedData, sortField, sortDirection]);

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("name")}
              >
                Test Name
                {sortField === "name" && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Institute/Section</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("dateTaken")}
              >
                Date
                {sortField === "dateTaken" && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("overallScore")}
              >
                Overall
                {sortField === "overallScore" && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </TableHead>
              <TableHead>VARC</TableHead>
              <TableHead>DILR</TableHead>
              <TableHead>QA</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTests.map((test) => (
              <TableRow key={test.id}>
                <TableCell className="font-medium">{test.name}</TableCell>
                <TableCell>
                  <Badge variant={isMockTest(test) ? "default" : "secondary"}>
                    {isMockTest(test) ? "Mock" : "Sectional"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {isMockTest(test) ? (
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 w-fit"
                    >
                      <Building className="h-3 w-3" />
                      {test.institute}
                    </Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {test.section}
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    {new Date(test.dateTaken).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  {isMockTest(test) ? (
                    <div className="space-y-1">
                      <div className="font-medium">{test.overallScore}</div>
                      <div className="text-xs text-muted-foreground">
                        {test.overallPercentile}%ile
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="font-medium">{test.score}</div>
                      <div className="text-xs text-muted-foreground">
                        {test.percentile}%ile
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {isMockTest(test) ? (
                    <div className="space-y-1">
                      <div className="font-medium">{test.varcScore}</div>
                      <div className="text-xs text-muted-foreground">
                        {test.varcPercentile}%ile
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {isMockTest(test) ? (
                    <div className="space-y-1">
                      <div className="font-medium">{test.dilrScore}</div>
                      <div className="text-xs text-muted-foreground">
                        {test.dilrPercentile}%ile
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  {isMockTest(test) ? (
                    <div className="space-y-1">
                      <div className="font-medium">{test.qaScore}</div>
                      <div className="text-xs text-muted-foreground">
                        {test.qaPercentile}%ile
                      </div>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Delete {isMockTest(test) ? "Mock" : "Sectional"} Test
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete &quot;{test.name}
                          &quot;? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(test)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
