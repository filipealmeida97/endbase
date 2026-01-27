// src/components/wizard/steps/StepProfile.tsx
"use client";

import { z } from "zod";
import type { WizardStepRenderProps } from "@/components/Wizard/wizard.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { WizardAllData } from "@/components/Wizard/steps/StepAccount";

const profileSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  document: z.string().min(11, "Documento inválido"),
});

export type ProfileStepData = z.infer<typeof profileSchema>;

export function StepProfile(
  props: WizardStepRenderProps<WizardAllData, ProfileStepData>
) {
  const { onNext, onBack, defaultValues, isLastStep } = props;

  const form = useForm<ProfileStepData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: defaultValues.name ?? "",
      document: defaultValues.document ?? "",
    },
  });

  function submit(data: ProfileStepData) {
    onNext(data);
  }

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Nome</label>
        <Input placeholder="Seu nome" {...form.register("name")} />
        {form.formState.errors.name?.message && (
          <p className="text-sm text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Documento</label>
        <Input placeholder="CPF/CNPJ" {...form.register("document")} />
        {form.formState.errors.document?.message && (
          <p className="text-sm text-destructive">
            {form.formState.errors.document.message}
          </p>
        )}
      </div>
    </form>
  );
}
