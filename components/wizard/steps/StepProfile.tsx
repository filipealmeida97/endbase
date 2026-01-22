"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepProfileSchema } from "@/schemas/wizard.schemas";
import type { z } from "zod";

import { useWizardStore } from "@/stores/wizard.store";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type StepProfileForm = z.infer<typeof stepProfileSchema>;

export function StepProfile() {
  const { data, setData, nextStep, prevStep } = useWizardStore();

  const form = useForm<StepProfileForm>({
    resolver: zodResolver(stepProfileSchema),
    defaultValues: {
      fullName: data.fullName ?? "",
      phone: data.phone ?? "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (values: StepProfileForm) => {
    setData(values);
    nextStep();
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nome completo</Label>
            <Input id="fullName" {...form.register("fullName")} />
            {form.formState.errors.fullName && (
              <p className="text-sm text-red-500">
                {form.formState.errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" {...form.register("phone")} />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button type="button" variant="outline" onClick={prevStep}>
              Voltar
            </Button>

            <Button type="submit">Próximo</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}