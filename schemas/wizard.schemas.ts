import { z } from "zod";

export const stepAccountSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
});

export const stepProfileSchema = z.object({
  fullName: z.string().min(3, "Nome muito curto"),
  phone: z.string().min(10, "Telefone inválido"),
});

export const wizardSchema = stepAccountSchema.merge(stepProfileSchema);

export type WizardData = z.infer<typeof wizardSchema>;
