import { CheckCircle } from "lucide-react";
import { Role } from "../types";

interface CompleteStepProps {
  role: Role;
  fullName: string;
}

export const CompleteStep = ({ role, fullName }: CompleteStepProps) => {
  const firstName = fullName.split(" ")[0];

  return (
    <div className="text-center py-8">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-step-complete/10 mb-6">
        <CheckCircle className="w-12 h-12 text-step-complete" />
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-3">
        You're all set, {firstName}! 🎉
      </h2>

      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        {role === Role.Seeker ? (
          <>
            Your profile is ready! Start exploring job opportunities and connect
            with top employers who are looking for talent like you.
          </>
        ) : (
          <>
            Your company profile is complete! You can now start posting jobs and
            discover amazing candidates to join your team.
          </>
        )}
      </p>
    </div>
  );
};
