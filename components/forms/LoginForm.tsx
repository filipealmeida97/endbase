"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginSchemaType } from "@/schemas/loginSchema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

import { Spinner } from "../ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { HeartCrack } from 'lucide-react';


interface LoginFormProps {
  className?: string;
}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    // ✅ limpa erro geral anterior
    form.clearErrors("root");
    setIsLoading(true);
    
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.email,
        password: data.password,
      }),
    });

    if (!res.ok) {
      console.log("Resposta de erro:", res.status === 401);
      if (res.status === 400 || res.status === 401) {
        const err = await res.json().catch(() => ({}));

        form.setError("root", {
          message: "Usuário ou senha inválidos.",
        });
        console.log("Erro de autenticação:", err);
      } else {
        form.setError("root", {
          message: "Erro inesperado. Tente novamente.",
        });
      }
      setIsLoading(false);
    }

    router.push("/home"); // ou "/(private)/home" conforme tua rota real
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={`space-y-4 max-w-sm ${className}`}
      {...props}
    >
      {isLoading ?  (
        <div className="flex items-center justify-center space-y-4 h-30 my-auto">
          <Spinner className="size-4 text-white" />
        </div>
      ) : (
        <>
          {/* ✅ Mensagem de erro geral */}
          {form.formState.errors.root?.message && (
            <Alert className="rounded-lg border border-red-500/30 bg-red-500/15 p-3 text-sm" variant="destructive">
              <AlertTitle className="font-bold"><HeartCrack className="inline mr-2 h-4 w-4" />Erro!</AlertTitle>
              <AlertDescription>
                {form.formState.errors.root.message}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" {...form.register("email")} autoCapitalize="none" />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <PasswordInput id="password" {...form.register("password")} />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full bg-white text-black hover:bg-blue-900 hover:text-white cursor-pointer">
            Entrar
          </Button>

        </>
      )}
      
    </form>
  );
}
