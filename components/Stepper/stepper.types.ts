import type { ReactNode, ReactElement } from "react";
import type { ZodSchema } from "zod";

export interface StepProps {
  children: ReactNode;
  schema?: ZodSchema;
  data?: unknown;
}

export interface StepperProps {
  children: ReactElement<StepProps>[];
  onFinalStepCompleted?: () => void;
  nextButtonText?: string;
  backButtonText?: string;
  className?: string;
}
