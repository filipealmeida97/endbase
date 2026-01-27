// src/components/wizard/index.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import { createWizardStore } from "@/stores/wizard.store";
import type { WizardProps } from "./wizard.types";

/**
 * Wizard Component
 * @description Componente genérico e reutilizável para fluxo multi-etapas.
 * Ele não controla inputs diretamente — cada Step faz isso.
 * Ele apenas:
 * - controla o step atual
 * - acumula dados
 * - valida step atual com schema antes de avançar
 * - chama onFinish ao concluir
 */
export function Wizard<TData extends Record<string, unknown>>(props: WizardProps<TData>) {
  const {
    steps,
    onFinish,
    initialStepIndex = 0,
    initialData,
    labels,
  } = props;

  const wizardStore = useMemo(() => createWizardStore<TData>(), []);

  const stepIndex = wizardStore((s) => s.stepIndex);
  const data = wizardStore((s) => s.data);

  const setStepIndex = wizardStore((s) => s.setStepIndex);
  const nextStep = wizardStore((s) => s.nextStep);
  const prevStep = wizardStore((s) => s.prevStep);
  const updateData = wizardStore((s) => s.updateData);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  const currentStep = steps[stepIndex];
  const CurrentStepComponent = currentStep.component;

  const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

  useEffect(() => {
    setStepIndex(initialStepIndex);

    if (initialData) {
      updateData(initialData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @function validateCurrentStep
   * @description Valida somente os dados que o Step atual exige.
   * Se tiver erro, impede avançar.
   */
  function validateCurrentStep(): boolean {
    setStepError(null);

    const result = currentStep.schema.safeParse(data);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      setStepError(firstIssue?.message ?? "Preencha corretamente os campos dessa etapa.");
      return false;
    }

    return true;
  }

  /**
   * @function handleNext
   * @description Se step atual é válido, avança.
   */
  function handleNext() {
    const ok = validateCurrentStep();
    if (!ok) return;

    nextStep();
  }

  /**
   * @function handleFinish
   * @description Valida última etapa e chama callback final.
   */
  async function handleFinish() {
    const ok = validateCurrentStep();
    if (!ok) return;

    setIsSubmitting(true);

    try {
      // Aqui você pode “forçar” TData porque concluiu tudo
      // (ou se preferir, valida tudo com um schema final no onFinish)
      await onFinish(data as TData);
    } finally {
      setIsSubmitting(false);
    }
  }

  const backLabel = labels?.back ?? "Voltar";
  const nextLabel = labels?.next ?? "Próximo";
  const finishLabel = labels?.finish ?? "Finalizar";

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="space-y-2">
        <CardTitle className="text-xl">{currentStep.title}</CardTitle>

        <div className="space-y-1">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground">
            Etapa {stepIndex + 1} de {steps.length}
          </p>
        </div>

        {stepError && (
          <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500">
            {stepError}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Renderiza o componente Step atual */}
        <CurrentStepComponent
          data={data}
          updateData={updateData}
          next={handleNext}
          prev={prevStep}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
        />

        {/* Footer padrão do Wizard */}
        <div className="flex items-center justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={isFirstStep || isSubmitting}
          >
            {backLabel}
          </Button>

          {!isLastStep ? (
            <Button type="button" onClick={handleNext} disabled={isSubmitting}>
              {nextLabel}
            </Button>
          ) : (
            <Button type="button" onClick={handleFinish} disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : finishLabel}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
