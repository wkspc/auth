import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório!"),
  email: z.string().email("Email inválido!"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres!"),
  plate: z.nullable(z.coerce.number()),
});

export type studentType = z.infer<typeof studentSchema>;

export const supervisorSchema = z.object({
  name: z.string().min(3, "Nome é obrigatório!"),
  email: z.string().email("Email inválido!"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres!"),
});

export type supervisorType = z.infer<typeof supervisorSchema>;

export type userType = studentType & supervisorType;
