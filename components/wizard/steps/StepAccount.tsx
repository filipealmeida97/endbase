"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { stepAccountSchema } from "@/schemas/wizard.schemas";
import type { z } from "zod";
import { useWizardStore } from "@/stores/wizard.store";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type StepAccountForm = z.infer<typeof stepAccountSchema>;

export function StepAccount() {
  const { data, setData, nextStep } = useWizardStore();

  const form = useForm<StepAccountForm>({
    resolver: zodResolver(stepAccountSchema),
    defaultValues: {
      email: data.email ?? "",
      password: data.password ?? "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (values: StepAccountForm) => {
    setData(values);
    nextStep();
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Conta</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seuemail@dominio.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" {...form.register("password")} />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button type="submit">Próximo</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
