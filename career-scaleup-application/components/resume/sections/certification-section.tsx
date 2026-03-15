"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { CertificationSectionProps } from "@/app/types";
import { Card } from "../../ui/card";

export default function CertificationSection({
  data,
  setEntryData,
}: CertificationSectionProps) {
  return (
    <div className="w-full space-y-4">
      {data.map((certificate, index) => (
        <Card
          key={certificate.id}
          className="p-4 hover:shadow-custom-md transition-smooth shadow-none"
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-foreground">
                {certificate.name || "Certificate Name"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {certificate.issuer || "Issuer"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(certificate.issueDate).toLocaleDateString()} -
                {new Date(certificate.expiryDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEntryData("certifications", certificate)}
                className="h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                // onClick={() => handleDelete(exp.id)}
                className="h-8 w-8 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
