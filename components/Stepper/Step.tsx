"use client";

import { useEffect } from "react";
import { useStepContext } from "./stepper.context";
import { useStepperStore } from "./stepper.store";
import type { StepProps } from "./stepper.types";

export function Step({ children, schema, data }: StepProps) {
  const { stepIndex } = useStepContext();
  const setCanProceed = useStepperStore((s) => s.setCanProceed);

  useEffect(() => {
    if (!schema) {
      setCanProceed(stepIndex, true);
      return;
    }

    const result = schema.safeParse(data);
    setCanProceed(stepIndex, result.success);
  }, [schema, data, stepIndex, setCanProceed]);

  return <>{children}</>;
}
