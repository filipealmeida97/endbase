import { create } from "zustand";

interface StepperState {
  currentStep: number;
  totalSteps: number;
  canProceedMap: Record<number, boolean>;

  setTotalSteps: (total: number) => void;
  nextStep: () => void;
  prevStep: () => void;

  setCanProceed: (step: number, value: boolean) => void;
}

export const useStepperStore = create<StepperState>((set, get) => ({
  currentStep: 0,
  totalSteps: 0,
  canProceedMap: {},

  setTotalSteps: (total) => set({ totalSteps: total }),

  nextStep: () => {
    const { currentStep, totalSteps, canProceedMap } = get();

    if (canProceedMap[currentStep] === false) return;
    if (currentStep >= totalSteps - 1) return;

    set({ currentStep: currentStep + 1 });
  },

  prevStep: () => {
    const { currentStep } = get();
    if (currentStep === 0) return;

    set({ currentStep: currentStep - 1 });
  },

  setCanProceed: (step, value) =>
    set((state) => ({
      canProceedMap: {
        ...state.canProceedMap,
        [step]: value,
      },
    })),
}));
