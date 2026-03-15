import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Route } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function RecruiterJobEmptyState() {
  const router = useRouter();
  const pathname = usePathname();

  const home =
    pathname === "/dashboard/recruiter" || "/dashboard/recuiter/profile";

  return (
    <Card className="h-full flex items-center justify-center border-none shadow-none">
      <CardContent className="flex flex-col items-center justify-center py-8 text-center">
        <Route className="h-10 w-10 text-muted-foreground mb-4" />

        <h3 className="text-lg font-semibold">
          You haven’t posted any jobs yet
        </h3>

        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Start attracting candidates by creating your first job post. You’ll be
          able to track applications and manage hiring easily.
        </p>

        {home && (
          <Button
            className="mt-6 bg-blue-600 hover:bg-blue-700"
            onClick={() => router.push("/dashboard/recruiter/jobs")}
          >
            Post your first job
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
