// src/components/wizard/wizard.types.ts
import { z } from "zod";

export interface WizardStepProps<TData extends object> {
  data: Partial<TData>;
  updateData: (payload: Partial<TData>) => void;

  next: () => void;
  prev: () => void;

  isFirstStep: boolean;
  isLastStep: boolean;
}

export interface WizardStepDefinition<TData extends object> {
  title: string;
  schema: z.ZodTypeAny;
  component: React.ComponentType<WizardStepProps<TData>>;
}

export interface WizardProps<TData extends object> {
  steps: WizardStepDefinition<TData>[];
  onFinish: (data: TData) => Promise<void> | void;
  initialStepIndex?: number;
  initialData?: Partial<TData>;
  labels?: {
    back?: string;
    next?: string;
    finish?: string;
  };
}
