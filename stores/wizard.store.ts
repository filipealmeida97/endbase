import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WizardData } from "@/schemas/wizard.schemas";

type WizardStore = {
  step: number;
  data: Partial<WizardData>;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  setData: (payload: Partial<WizardData>) => void;
  reset: () => void;
};

export const useWizardStore = create<WizardStore>()(
  persist(
    (set) => ({
      step: 0,
      data: {},

      setStep: (step) => set({ step }),
      nextStep: () => set((s) => ({ step: s.step + 1 })),
      prevStep: () => set((s) => ({ step: Math.max(0, s.step - 1) })),

      setData: (payload) =>
        set((s) => ({
          data: { ...s.data, ...payload },
        })),

      reset: () => set({ step: 0, data: {} }),
    }),
    {
      name: "wizard-storage",
    }
  )
);
