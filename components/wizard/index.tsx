// src/components/wizard/Wizard.tsx
"use client";

import { useEffect, useMemo } from "react";
import type { WizardProps } from "@/components/Wizard/wizard.types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { createWizardStore } from "@/stores/wizard.store";

export function Wizard<TAllData extends Record<string, unknown>>({
  steps,
  onFinish,
  initialStep = 0,
  showHeader = true,
  className,
}: WizardProps<TAllData>) {
  const useWizardStore = useMemo(() => createWizardStore<TAllData>(), []);

  const step = useWizardStore((s) => s.step);
  const data = useWizardStore((s) => s.data);

  const setStep = useWizardStore((s) => s.setStep);
  const nextStep = useWizardStore((s) => s.nextStep);
  const prevStep = useWizardStore((s) => s.prevStep);
  const setData = useWizardStore((s) => s.setData);

  useEffect(() => {
    setStep(initialStep);
  }, [initialStep, setStep]);

  const totalSteps = steps.length;
  const currentStep = Math.min(step, totalSteps - 1);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  const progressValue =
    totalSteps <= 1 ? 100 : Math.round(((currentStep+1) / totalSteps) * 100);
    
  const activeStepConfig = steps[currentStep];

  function handleNext<TStepData extends Record<string, unknown>>(payload: TStepData) {
    // Merge dos dados do step no estado global
    setData(payload as Partial<TAllData>);

    if (isLastStep) {
      // Como isso é uma composição de steps, a finalização acontece aqui
      // A responsabilidade de garantir consistência final (ou schema final) é sua
      onFinish({ ...(data as TAllData), ...(payload as Partial<TAllData>) } as TAllData);
      return;
    }

    nextStep();
  }

  function handleBack() {
    if (!isFirstStep) prevStep();
  }

  if (!activeStepConfig) {
    return null;
  }

  return (
    <div className={`w-full max-w-2xl rounded-2xl border bg-background p-6 shadow-sm ${className}`}>
      {showHeader && (
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">
                Passo {currentStep + 1} de {totalSteps}
              </p>

              {activeStepConfig.title && (
                <h2 className="text-lg font-semibold">{activeStepConfig.title}</h2>
              )}
            </div>


          </div>

          <Progress value={progressValue} />
        </div>
      )}

      <div>
        {activeStepConfig.render({
          data,
          defaultValues: data,
          onNext: handleNext,
          onBack: handleBack,
          isFirstStep,
          isLastStep,
        })}
        <div className="flex items-center justify-end gap-2 mt-3">
          <Button
            className="cursor-pointer"
            type="button"
            variant="outline"
            onClick={handleBack}
            disabled={isFirstStep}
          >
            Voltar
          </Button>          
          <Button
            className="cursor-pointer"
            type="submit"
            variant="default"
            onClick={() => handleNext({} as TAllData)}    
          >
            {isLastStep ? "Finalizar" : "Próximo"}
          </Button>
        </div>
      </div>
    </div>
  );
}
