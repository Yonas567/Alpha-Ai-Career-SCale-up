"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/context/AuthContext";
import { SignupForm, signupSchema } from "@/app/schema/auth.schema";
import { Role } from "@/app/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const { sendOtpVerificationCode } = useAuthContext();

  const [formData, setFormData] = useState<SignupForm>({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<Role>(Role.Seeker);

  const { fullName, email, password } = formData;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = signupSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      const firstError =
        Object.values(fieldErrors).flat().filter(Boolean)[0] || "Invalid input";

      setError(firstError);
      return;
    }

    setLoading(true);

    sendOtpVerificationCode(fullName, email, password, role)
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <FieldGroup>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => setRole(Role.Seeker)}
                    variant={role === "Seeker" ? "default" : "outline"}
                  >
                    Job Seeker
                  </Button>
                  <Button
                    onClick={() => setRole(Role.Recruiter)}
                    variant={role === "Recruiter" ? "default" : "outline"}
                  >
                    Recruiter
                  </Button>
                </Field>
              </Field>
              <Field>
                <FieldLabel htmlFor="name">
                  {role === "Seeker" ? "Full Name" : "Company Name"}
                </FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder={role === "Seeker" ? "John Doe" : "Acme Inc."}
                  required
                  value={fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                />

                <FieldDescription>
                  {error && (
                    <div className="text-red-600 pt-0.5 text-sm">{error}</div>
                  )}
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin flex items-center justify-center" />
                      Creating
                    </>
                  ) : (
                    <>Create Account</>
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Already have an account? <Link href="/auth">Sign in</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
