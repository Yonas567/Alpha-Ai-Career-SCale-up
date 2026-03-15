"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SlidersHorizontal } from "lucide-react";

export interface JobFilters {
  searchQuery: string;
  datePosted: string[];
  jobType: string[];
  workMode: string[];
  experienceLevel: string[];
  salaryRange: [number, number];
  location: string;
  industry: string[];
  companySize: string[];
}

interface JobFilterProps {
  onFiltersChange?: (filters: JobFilters) => void;
}

function FilterContent({
  filters,
  updateFilter,
  toggleArrayFilter,
  clearAllFilters,
  activeFilterCount,
  onApply,
}: {
  filters: JobFilters;
  updateFilter: <K extends keyof JobFilters>(
    key: K,
    value: JobFilters[K]
  ) => void;
  toggleArrayFilter: (
    key: keyof Pick<
      JobFilters,
      | "datePosted"
      | "jobType"
      | "workMode"
      | "experienceLevel"
      | "industry"
      | "companySize"
    >,
    value: string
  ) => void;
  clearAllFilters: () => void;
  activeFilterCount: number;
  onApply?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <h2 className="font-sans text-lg font-semibold text-foreground">
            Filters
          </h2>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="font-mono text-xs">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-8 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="space-y-6 pt-2 pb-6">
          <Accordion
            type="multiple"
            defaultValue={["date", "type", "mode", "salary"]}
            className="w-full"
          >
            <AccordionItem value="date" className="border-border">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                Date Posted
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {[
                    { label: "Last 24 hours", value: "24h" },
                    { label: "Last 3 days", value: "3d" },
                    { label: "Last 7 days", value: "7d" },
                    { label: "Last 15 days", value: "15d" },
                    { label: "Last 30 days", value: "30d" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={`date-${option.value}`}
                        checked={filters.datePosted.includes(option.value)}
                        onCheckedChange={() =>
                          toggleArrayFilter("datePosted", option.value)
                        }
                        className="h-5 w-5"
                      />
                      <Label
                        htmlFor={`date-${option.value}`}
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="type" className="border-border">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                Job Type
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {[
                    { label: "Full-time", value: "full-time" },
                    { label: "Part-time", value: "part-time" },
                    { label: "Contract", value: "contract" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={`type-${option.value}`}
                        checked={filters.jobType.includes(option.value)}
                        onCheckedChange={() =>
                          toggleArrayFilter("jobType", option.value)
                        }
                        className="h-5 w-5"
                      />
                      <Label
                        htmlFor={`type-${option.value}`}
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mode" className="border-border">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                Work Mode
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {[
                    { label: "Remote", value: "remote" },
                    { label: "On-site", value: "onsite" },
                    { label: "Hybrid", value: "hybrid" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={`mode-${option.value}`}
                        checked={filters.workMode.includes(option.value)}
                        onCheckedChange={() =>
                          toggleArrayFilter("workMode", option.value)
                        }
                        className="h-5 w-5"
                      />
                      <Label
                        htmlFor={`mode-${option.value}`}
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="experience" className="border-border">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                Experience Level
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 pt-2">
                  {[
                    { label: "Entry Level", value: "entry" },
                    { label: "Mid Level", value: "mid" },
                    { label: "Senior Level", value: "senior" },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={`exp-${option.value}`}
                        checked={filters.experienceLevel.includes(option.value)}
                        onCheckedChange={() =>
                          toggleArrayFilter("experienceLevel", option.value)
                        }
                        className="h-5 w-5"
                      />
                      <Label
                        htmlFor={`exp-${option.value}`}
                        className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="salary" className="border-border">
              <AccordionTrigger className="text-sm font-medium hover:no-underline">
                Salary Range
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2">
                  <Slider
                    min={0}
                    max={200000}
                    step={5000}
                    value={filters.salaryRange}
                    onValueChange={(value) =>
                      updateFilter("salaryRange", value as [number, number])
                    }
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="font-mono">
                      ${filters.salaryRange[0].toLocaleString()}
                    </span>
                    <span className="font-mono">
                      ${filters.salaryRange[1].toLocaleString()}
                      {filters.salaryRange[1] >= 200000 ? "+" : ""}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {onApply && (
        <div className="border-t border-border pt-4 lg:hidden">
          <Button onClick={onApply} className="w-full" size="lg">
            Apply Filters
          </Button>
        </div>
      )}
    </div>
  );
}

export function JobFilter({ onFiltersChange }: JobFilterProps) {
  const [filters, setFilters] = useState<JobFilters>({
    searchQuery: "",
    datePosted: [],
    jobType: [],
    workMode: [],
    experienceLevel: [],
    salaryRange: [0, 200000],
    location: "",
    industry: [],
    companySize: [],
  });
  const [isOpen, setIsOpen] = useState(false);

  const updateFilter = <K extends keyof JobFilters>(
    key: K,
    value: JobFilters[K]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const toggleArrayFilter = (
    key: keyof Pick<
      JobFilters,
      | "datePosted"
      | "jobType"
      | "workMode"
      | "experienceLevel"
      | "industry"
      | "companySize"
    >,
    value: string
  ) => {
    const currentValues = filters[key] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    updateFilter(key, newValues);
  };

  const clearAllFilters = () => {
    const clearedFilters: JobFilters = {
      searchQuery: "",
      datePosted: [],
      jobType: [],
      workMode: [],
      experienceLevel: [],
      salaryRange: [0, 200000],
      location: "",
      industry: [],
      companySize: [],
    };
    setFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.searchQuery) count++;
    if (filters.datePosted.length > 0) count++;
    if (filters.jobType.length > 0) count++;
    if (filters.workMode.length > 0) count++;
    if (filters.experienceLevel.length > 0) count++;
    if (filters.salaryRange[0] > 0 || filters.salaryRange[1] < 200000) count++;
    if (filters.location) count++;
    if (filters.industry.length > 0) count++;
    if (filters.companySize.length > 0) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  const handleApply = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="lg"
              className="w-full gap-2 bg-transparent"
            >
              <SlidersHorizontal className="h-5 w-5" />
              Filters
              {activeFilterCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-auto font-mono text-xs"
                >
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[90vh] p-6">
            <SheetHeader className="mb-4">
              <SheetTitle className="sr-only">Job Filters</SheetTitle>
            </SheetHeader>
            <FilterContent
              filters={filters}
              updateFilter={updateFilter}
              toggleArrayFilter={toggleArrayFilter}
              clearAllFilters={clearAllFilters}
              activeFilterCount={activeFilterCount}
              onApply={handleApply}
            />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden w-full max-w-sm lg:block">
        <FilterContent
          filters={filters}
          updateFilter={updateFilter}
          toggleArrayFilter={toggleArrayFilter}
          clearAllFilters={clearAllFilters}
          activeFilterCount={activeFilterCount}
        />
      </div>
    </>
  );
}
