"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { otpSchema } from "@/app/schema/auth.schema";
import { useAuthContext } from "@/app/context/AuthContext";
import { UserRegistrationData } from "@/app/types";
import { roleMap } from "@/app/constants";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";

export default function VerifyOtp() {
  const router = useRouter();
  const {
    userRegistrationData,
    sendOtpVerificationCode,
    verifyAndRegisterUser,
  } = useAuthContext();

  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!canResend && otpCountdown > 0) {
      const timer = setTimeout(() => setOtpCountdown((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (otpCountdown === 0) {
      setCanResend(true);
    }
  }, [otpCountdown, canResend]);

  const handleResendOtp = () => {
    setOtpCountdown(30);
    setCanResend(false);
    setOtp("");
    setError("");

    const { fullName, email, password, role } = userRegistrationData!;

    sendOtpVerificationCode(fullName, email, password, role)
      .then(() => {
        setSuccess("New OTP sent!");
      })
      .catch(() => {
        setError("Failed to resend OTP. Please try again.");
      });
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const result = otpSchema.safeParse({ otp });

    if (!result.success) {
      const firstError =
        result.error.flatten().fieldErrors.otp?.[0] ||
        result.error.flatten().formErrors[0] ||
        "Invalid OTP";
      setError(firstError);
      return;
    }

    setLoading(true);

    const response: UserRegistrationData = {
      fullName: userRegistrationData?.fullName!,
      password: userRegistrationData?.password!,
      email: userRegistrationData?.email!,
      role: userRegistrationData?.role!,
    };

    verifyAndRegisterUser(response)
      .then(() => {
        setSuccess("OTP verified successfully!");
        setError("");
        router.push(roleMap[userRegistrationData!.role]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setError("Failed to verify OTP. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={cn("flex flex-col gap-6 md:min-h-[400px]")}>
      <Card className="flex-1 overflow-hidden p-0">
        <CardContent className="grid flex-1 p-0">
          <form
            onSubmit={handleVerifyOtp}
            className="flex flex-col items-center justify-center px-6 md:px-8"
          >
            <FieldGroup>
              <Field className="items-center text-center">
                <h1 className="text-2xl font-bold">Enter verification code</h1>
                <p className="text-muted-foreground text-sm text-balance">
                  We sent a 6-digit code to your email
                </p>
              </Field>
              <Field>
                <FieldLabel htmlFor="otp" className="sr-only">
                  Verification code
                </FieldLabel>
                <InputOTP
                  maxLength={6}
                  id="otp"
                  required
                  containerClassName="gap-4"
                  value={otp}
                  onChange={setOtp}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <FieldDescription className="text-center">
                  Enter the 6-digit code sent to your email.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Verifying
                    </>
                  ) : (
                    <>Verify</>
                  )}
                </Button>
                <FieldDescription className="text-center">
                  Didn&apos;t receive the code?
                  <Button variant="link" onClick={handleResendOtp}>
                    Resend
                  </Button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
