import { NextFunction, Response, Request } from "express"
import { z } from "zod"
import { formatZodError } from "../utils/formatZodError"
import HttpStatusCode from "../const/httpStatusCode"

export const RequestValidator =
  (schema: z.AnyZodObject | z.ZodOptional<z.AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const parsedReq = await schema.safeParseAsync(req.body)
    if (!parsedReq.success) {
      return res
        .status(HttpStatusCode.BAD_REQUEST)
        .json(formatZodError(parsedReq.error))
    }

    next()
  }
