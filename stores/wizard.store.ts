// src/stores/wizard.store.ts
"use client";

import { create } from "zustand";

export interface WizardStore<TData extends object> {
  stepIndex: number;
  data: Partial<TData>;

  setStepIndex: (index: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  updateData: (payload: Partial<TData>) => void;
  reset: () => void;
}

export function createWizardStore<TData extends object>() {
  return create<WizardStore<TData>>((set) => ({
    stepIndex: 0,
    data: {},

    setStepIndex: (index) => set(() => ({ stepIndex: index })),
    nextStep: () => set((state) => ({ stepIndex: state.stepIndex + 1 })),
    prevStep: () =>
      set((state) => ({ stepIndex: Math.max(state.stepIndex - 1, 0) })),

    updateData: (payload) =>
      set((state) => ({
        data: {
          ...state.data,
          ...payload,
        },
      })),

    reset: () => set(() => ({ stepIndex: 0, data: {} })),
  }));
}
