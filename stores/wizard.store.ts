// src/stores/wizard.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WizardState<TAllData extends Record<string, unknown>> {
  step: number;
  data: Partial<TAllData>;

  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  setData: (payload: Partial<TAllData>) => void;
  reset: () => void;
}

/**
 * @function createWizardStore
 * @description
 * Cria uma store do Zustand tipada para o Wizard.
 * Você pode criar uma store por wizard (com persist diferente).
 */
export function createWizardStore<TAllData extends Record<string, unknown>>() {
  return create<WizardState<TAllData>>()(
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
        name: "wizard-storage", // pode mudar por wizard
      }
    )
  );
}
