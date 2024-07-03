import { ZodError } from "zod"

export const formatZodError = (error: ZodError) => {
  const formattedError = error.errors.map((err) => {
    const field = err.path.join(".")
    const message = err.message

    return { field, message }
  })

  return formattedError
}
