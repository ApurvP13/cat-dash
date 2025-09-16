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

// Interface for mock test data
interface MockTestData {
  id: string;
  name: string;
  overallScore: number;
  overallPercentile: number;
  institute: string;
  varcScore: number;
  varcPercentile: number;
  dilrScore: number;
  dilrPercentile: number;
  qaScore: number;
  qaPercentile: number;
  dateTaken: string;
}

// Type for sorting fields
type SortField = keyof MockTestData;
type SortDirection = "asc" | "desc";

const DataTable = () => {
  // Cleaned up data with proper naming
  const tableData: MockTestData[] = [
    {
      id: "1",
      name: "Simcat 1",
      overallScore: 145,
      overallPercentile: 85,
      institute: "IMS",
      varcScore: 35,
      varcPercentile: 99.28,
      dilrScore: 28,
      dilrPercentile: 98.75,
      qaScore: 43,
      qaPercentile: 99.76,
      dateTaken: "2025-09-16",
    },
    {
      id: "2",
      name: "Simcat 2",
      overallScore: 162,
      overallPercentile: 92,
      institute: "IMS",
      varcScore: 42,
      varcPercentile: 88.45,
      dilrScore: 35,
      dilrPercentile: 89.32,
      qaScore: 55,
      qaPercentile: 95.21,
      dateTaken: "2025-09-23",
    },
    {
      id: "3",
      name: "Simcat 3",
      overallScore: 138,
      overallPercentile: 78,
      institute: "TIME",
      varcScore: 38,
      varcPercentile: 82.15,
      dilrScore: 22,
      dilrPercentile: 71.45,
      qaScore: 48,
      qaPercentile: 87.65,
      dateTaken: "2025-09-30",
    },
    {
      id: "4",
      name: "Simcat 4",
      overallScore: 175,
      overallPercentile: 95,
      institute: "IMS",
      varcScore: 58,
      varcPercentile: 94.28,
      dilrScore: 45,
      dilrPercentile: 92.75,
      qaScore: 62,
      qaPercentile: 96.76,
      dateTaken: "2025-10-07",
    },
    {
      id: "5",
      name: "Simcat 5",
      overallScore: 158,
      overallPercentile: 88,
      institute: "CL",
      varcScore: 48,
      varcPercentile: 91.18,
      dilrScore: 38,
      dilrPercentile: 85.25,
      qaScore: 52,
      qaPercentile: 89.43,
      dateTaken: "2025-10-14",
    },
    {
      id: "6",
      name: "Simcat 6",
      overallScore: 169,
      overallPercentile: 94,
      institute: "TIME",
      varcScore: 52,
      varcPercentile: 93.67,
      dilrScore: 42,
      dilrPercentile: 90.12,
      qaScore: 58,
      qaPercentile: 94.88,
      dateTaken: "2025-10-21",
    },
    {
      id: "7",
      name: "Simcat 7",
      overallScore: 182,
      overallPercentile: 97,
      institute: "IMS",
      varcScore: 62,
      varcPercentile: 96.45,
      dilrScore: 48,
      dilrPercentile: 94.33,
      qaScore: 65,
      qaPercentile: 97.12,
      dateTaken: "2025-10-28",
    },
    {
      id: "8",
      name: "Simcat 8",
      overallScore: 156,
      overallPercentile: 86,
      institute: "CL",
      varcScore: 45,
      varcPercentile: 88.92,
      dilrScore: 35,
      dilrPercentile: 83.67,
      qaScore: 50,
      qaPercentile: 88.54,
      dateTaken: "2025-11-04",
    },
  ];

  // State for sorting
  const [sortField, setSortField] = useState<SortField>("dateTaken");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // Handle delete mock test
  const handleDeleteMock = (id: string) => {
    // TODO: Implement delete functionality
    console.log(`Deleting mock test with id: ${id}`);
    // This would typically update your state or call an API
  };

  // Sort the data
  const sortedTests = useMemo(() => {
    return [...tableData].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

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
  }, [tableData, sortField, sortDirection]);

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
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("institute")}
              >
                Institute
                {sortField === "institute" && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </TableHead>
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
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("varcScore")}
              >
                VARC
                {sortField === "varcScore" && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("dilrScore")}
              >
                DILR
                {sortField === "dilrScore" && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort("qaScore")}
              >
                QA
                {sortField === "qaScore" && (
                  <span className="ml-1">
                    {sortDirection === "asc" ? "↑" : "↓"}
                  </span>
                )}
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTests.map((test) => (
              <TableRow key={test.id}>
                <TableCell className="font-medium">{test.name}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 w-fit"
                  >
                    <Building className="h-3 w-3" />
                    {test.institute}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    {new Date(test.dateTaken).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{test.overallScore}</div>
                    <div className="text-xs text-muted-foreground">
                      {test.overallPercentile}%ile
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{test.varcScore}</div>
                    <div className="text-xs text-muted-foreground">
                      {test.varcPercentile}%ile
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{test.dilrScore}</div>
                    <div className="text-xs text-muted-foreground">
                      {test.dilrPercentile}%ile
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{test.qaScore}</div>
                    <div className="text-xs text-muted-foreground">
                      {test.qaPercentile}%ile
                    </div>
                  </div>
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
                        <AlertDialogTitle>Delete Mock Test</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{test.name}"? This
                          action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteMock(test.id)}
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
