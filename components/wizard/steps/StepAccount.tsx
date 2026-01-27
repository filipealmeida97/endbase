// src/components/wizard/steps/StepAccount.tsx
"use client";

import { z } from "zod";
import type { WizardStepRenderProps } from "@/components/Wizard/wizard.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const accountSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha precisa ter no mínimo 6 caracteres"),
});

export type AccountStepData = z.infer<typeof accountSchema>;

export interface WizardAllData extends Record<string, unknown> {
  email: string;
  password: string;

  name: string;
  document: string;
}

export function StepAccount(
  props: WizardStepRenderProps<WizardAllData, AccountStepData>
) {
  const { onNext, defaultValues } = props;

  const form = useForm<AccountStepData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      email: defaultValues.email ?? "",
      password: defaultValues.password ?? "",
    },
  });

  function submit(data: AccountStepData) {
    onNext(data);
  }

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">E-mail</label>
        <Input
          placeholder="seuemail@email.com"
          {...form.register("email")}
        />
        {form.formState.errors.email?.message && (
          <p className="text-sm text-destructive">
            {form.formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Senha</label>
        <Input
          type="password"
          placeholder="••••••"
          {...form.register("password")}
        />
        {form.formState.errors.password?.message && (
          <p className="text-sm text-destructive">
            {form.formState.errors.password.message}
          </p>
        )}
      </div>

    </form>
  );
}
