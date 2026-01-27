// src/components/wizard/steps/StepAccount.tsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { WizardStepProps } from "../wizard.types";

export interface WizardData {
  name: string;
  email: string;

  street: string;
  number: string;
}

export function StepAccount(props: WizardStepProps<WizardData>) {
  const { data, updateData } = props;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          value={(data.name as string) ?? ""}
          onChange={(e) => updateData({ name: e.target.value })}
          placeholder="Seu nome"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          value={(data.email as string) ?? ""}
          onChange={(e) => updateData({ email: e.target.value })}
          placeholder="seuemail@email.com"
        />
      </div>
    </div>
  );
}
