import { createContext, useContext } from "react";

interface StepperContextValue {
  stepIndex: number;
}

const StepperContext = createContext<StepperContextValue | null>(null);

export function useStepContext() {
  const ctx = useContext(StepperContext);
  if (!ctx) {
    throw new Error("Step must be used inside Stepper");
  }
  return ctx;
}

export { StepperContext };
