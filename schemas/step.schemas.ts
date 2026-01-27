// src/schemas/step.schemas.ts
import { z } from "zod";

export const stepAccountSchema = z.object({
  name: z
    .string({ message: "Nome é obrigatório." })
    .min(3, "Nome precisa ter no mínimo 3 caracteres."),
  email: z
    .string({ message: "E-mail é obrigatório." })
    .email("E-mail inválido."),
});

export const stepAddressSchema = z.object({
  street: z.string({ message: "Rua é obrigatória." }).min(3, "Rua obrigatória."),
  number: z.string().min(1, "Número obrigatório."),
});
