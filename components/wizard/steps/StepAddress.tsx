// src/components/wizard/steps/StepAddress.tsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { WizardStepProps } from "../wizard.types";
import type { WizardData } from "./StepAccount";

export function StepAddress(props: WizardStepProps<WizardData>) {
  const { data, updateData } = props;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="street">Rua</Label>
        <Input
          id="street"
          value={(data.street as string) ?? ""}
          onChange={(e) => updateData({ street: e.target.value })}
          placeholder="Rua Exemplo"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="number">Número</Label>
        <Input
          id="number"
          value={(data.number as string) ?? ""}
          onChange={(e) => updateData({ number: e.target.value })}
          placeholder="123"
        />
      </div>
    </div>
  );
}
