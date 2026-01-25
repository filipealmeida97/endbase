"use client";

import { useWizardStore } from "@/stores/wizard.store";
import { StepAccount } from "@/components/Wizard/steps/StepAccount";
import { StepProfile } from "@/components/Wizard/steps/StepProfile";
import { StepReview } from "@/components/Wizard/steps/StepReview";
import { Progress } from "@/components/ui/progress";

const steps = [
  { title: "Conta", component: StepAccount },
  { title: "Perfil", component: StepProfile },
  { title: "Revisão", component: StepReview },
];

export function Wizard() {
  const { step } = useWizardStore();
  const CurrentStep = steps[step]?.component ?? StepAccount;

  const progress = Math.round(((step + 1) / steps.length) * 100);

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div className="w-full max-w-xl space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">
            Etapa {step + 1} de {steps.length}
          </span>
          <span className="text-muted-foreground">{steps[step]?.title}</span>
        </div>

        <Progress value={progress} />
      </div>

      <CurrentStep />
    </div>
  );
}
