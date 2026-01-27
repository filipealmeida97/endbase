// src/app/(exemplo)/page.tsx
"use client";

import React from "react";
import { Wizard } from "@/components/Wizard";
import { StepAccount } from "@/components/Wizard/steps/StepAccount";
import { StepAddress } from "@/components/Wizard/steps/StepAddress";

import { stepAccountSchema, stepAddressSchema } from "@/schemas/step.schemas";

import type { WizardStepDefinition } from "@/components/Wizard/wizard.types";
import type { WizardData } from "@/components/Wizard/steps/StepAccount";

export default function ExampleWizardPage() {
  const steps: WizardStepDefinition<WizardData>[] = [
    {
      title: "Dados Pessoais",
      schema: stepAccountSchema,
      component: StepAccount,
    },
    {
      title: "Dados de Entrega",
      schema: stepAddressSchema,
      component: StepAddress,
    },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Wizard<WizardData>
        steps={steps}
        onFinish={(data) => {
          console.log("Finalizou com:", data);
        }}
      />
    </div>
  );
}
