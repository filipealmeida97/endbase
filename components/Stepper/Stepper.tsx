"use client";

import { Children, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StepperContext } from "./stepper.context";
import { useStepperStore } from "./stepper.store";
import type { StepperProps } from "./stepper.types";
import { Progress } from "@/components/ui/progress";

export default function Stepper({
  children,
  onFinalStepCompleted,
  nextButtonText = "Next",
  backButtonText = "Back",
  className="",
}: StepperProps) {
  const steps = Children.toArray(children);

  const {
    currentStep,
    nextStep,
    prevStep,
    setTotalSteps,
    totalSteps,
  } = useStepperStore();

  useEffect(() => {
    setTotalSteps(steps.length);
  }, [steps.length, setTotalSteps]);

  const isLastStep = currentStep === totalSteps - 1;

  const progressValue =
    totalSteps <= 1 ? 100 : Math.round(((currentStep+1) / totalSteps) * 100);

  function handleNext() {
    if (isLastStep) {
      onFinalStepCompleted?.();
      return;
    }
    nextStep();
  }

  return (
    <div
      className={`w-full max-w-2xl rounded-2xl border bg-background p-6 shadow-sm ${className}`}
    >
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Passo {currentStep + 1} de {totalSteps}
            </p>
          </div>
        </div>

        <Progress value={progressValue} />
      </div>

      <StepperContext.Provider value={{ stepIndex: currentStep }}>
        {steps[currentStep]}
      </StepperContext.Provider>

      <div className="flex items-center justify-between gap-2 mt-3">
        <Button variant="outline" onClick={prevStep}>
          {backButtonText}
        </Button>

        <Button onClick={handleNext}>
          {isLastStep ? "Finish" : nextButtonText}
        </Button>
      </div>
    </div>
  );
}
