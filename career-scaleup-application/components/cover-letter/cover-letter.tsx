"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import OptimizeCoverLetter from "./optimize-cover-letter";
import GenerateCoverLetter from "./generate-cover-letter";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

export function CoverLetter() {
  const [activeTab, setActiveTab] = useState<string>("generate");
  const router = useRouter();
  const pathname = usePathname();
  const handleBack = () => {
    router.push("/dashboard/seeker/cover-letter");
  };
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="py-4 px-2 md:px-0 h-full overfow-y-scroll hide-scroll"
    >
      <div className="flex gap-2">
        {pathname === "/dashboard/seeker/cover-letter/new" && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="-ml-1 rounded-full cursor-pointer"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        )}

        <TabsList className="bg-card rounded-lg border border-border mb-4 flex flex-wrap">
          <TabsTrigger value="generate" className="flex-1 text-center">
            Generate
          </TabsTrigger>
          <TabsTrigger value="optimize" className="flex-1 text-center">
            Optimize
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="generate" className="h-full">
        <GenerateCoverLetter />
      </TabsContent>

      <TabsContent value="optimize" className="h-full">
        <OptimizeCoverLetter />
      </TabsContent>
    </Tabs>
  );
}