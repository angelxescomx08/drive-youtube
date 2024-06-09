import z from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

/**
 * Contenga al menos una letra minúscula.
Contenga al menos una letra mayúscula.
Contenga al menos un carácter especial de los listados.
Tenga una longitud mínima de 8 caracteres.
 */

export const userSchema = z.object({
  id_user: z.string(),
  email: z.string().email(),
  password: z.string().refine(password=>passwordRegex.test(password), "Not a valid password"),
})

export const createUserSchema = userSchema.omit({
  id_user: true
})

export type typeUser = z.infer<typeof userSchema>
export type typeCreateUser = z.infer<typeof createUserSchema>