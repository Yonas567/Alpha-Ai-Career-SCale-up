import { User } from "@/app/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export default function ContactInfoStep({
  formData,
  onChange,
}: {
  formData: any;
  onChange: (e: any) => void;
}) {
  const fetchProfile = async () => {
    const response = await axios.get("/api/profile");
    return response.data as User;
  };

  const {
    data: user,
    isPending,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    staleTime: Infinity,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Contact Information
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          We'll use this information to contact you about your application.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label
            htmlFor="email"
            className="text-sm font-medium text-foreground"
          >
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={onChange}
            disabled={true}
            className="mt-2 border-border bg-input text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div>
          <Label
            htmlFor="phone"
            className="text-sm font-medium text-foreground"
          >
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(123) 456-7890"
            value={formData.phone}
            onChange={onChange}
            disabled={true}
            className="mt-2 border-border bg-input text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>
    </div>
  );
}
