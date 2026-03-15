import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Briefcase } from "lucide-react";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";

export default function AppHeaderSkeleton() {
  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 ">
      <div className="flex w-full items-center gap-2 px-4 lg:gap-4 lg:px-6">
        <div className="flex items-center gap-3 ">
          <Separator
            orientation="vertical"
            className="h-6 bg-[hsl(var(--header-border))]"
          />
        </div>

        <div className="flex-1" />

        <div className="ml-auto flex items-center gap-2 lg:gap-3">
          <Avatar className="h-8 w-8 rounded-lg bg-blue-600">
            <AvatarImage className="bg-blue-600" src={""} alt={""} />
            <AvatarFallback className="rounded-lg bg-blue-600 transition-colors"></AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
