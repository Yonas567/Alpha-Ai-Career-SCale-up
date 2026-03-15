"use client";

import { MapPin, Search } from "lucide-react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useJobsManager } from "@/context/JobsManagerProvider";
import { useState } from "react";
import { IconFilter, IconFilter2Exclamation } from "@tabler/icons-react";

export default function FilterSection() {
  const { searchJobs, searchJobsMutation } = useJobsManager();

  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleLocationChange = (location: string) => {
    setLocation(location);
  };

  return (
    <div className="py-2">
      <div className="flex flex-col gap-3 lg:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, or company"
            className="pl-10 bg-background"
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by city or zip"
            className="pl-10 bg-background"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
          />
        </div>

        <Button
          className=" text-white px-6 bg-[#4d32fb] hover:bg-[#4d32fb]/90"
          onClick={() => searchJobsMutation.mutate({ searchTerm, location })}
        >
          <Search className="w-4 h-4" /> Search
        </Button>
      </div>

      <div className="hidden lg:flex flex-row gap-3 items-end">
        <div className="flex-1 min-w-0 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground " />
          <Input
            placeholder="Search by title, or company"
            className="pl-10 shadow-inner bg-background"
            value={searchTerm}
            onChange={(e) => handleSearchTermChange(e.target.value)}
          />
        </div>

        <div className="flex-1 min-w-0 relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by city or zip"
            className="pl-10 shadow-inner bg-background"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
          />
        </div>

        <Button
          className=" text-white px-6 bg-[#4d32fb] hover:bg-[#4d32fb]/90"
          onClick={() => searchJobs(searchTerm, location)}
        >
          <Search className="w-4 h-4" /> Search
        </Button>
      </div>
    </div>
  );
}
