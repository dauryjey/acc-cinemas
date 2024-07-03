import { prisma } from "../utils/db"
import bcrypt from "bcrypt"
import { Prisma } from "@prisma/client"
import { PrismaUniqueConstraintError } from "../const/prismaErrors"
import { ErrorAuth, ErrorMsg } from "../const/errorMessages"
import { Request, Response } from "express"
import { generateJWT } from "../utils/jwt"
import HttpStatusCode from "../const/httpStatusCode"
import { userSchema } from "../zod/UserSchema"
import { formatZodError } from "../utils/formatZodError"

async function createUser(req: Request, res: Response) {
  const user = userSchema.safeParse(req.body as Prisma.UserCreateInput)

  if (!user.success) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json(formatZodError(user.error))
  }

  const { email, firstName, lastName, password, isAdmin } = user.data

  try {
    await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: await bcrypt.hash(password, 10),
        isAdmin,
      },
    })

    const token = generateJWT({ email, isAdmin })

    return res.status(HttpStatusCode.CREATED).json({ Token: "Bearer " + token })
  } catch (error) {
    if (error instanceof PrismaUniqueConstraintError) {
      return res
        .status(HttpStatusCode.CONFLICT)
        .json({ message: ErrorAuth.ALREADY_EXISTS })
    }

    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body as Prisma.UserCreateInput

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: ErrorAuth.NOT_FOUND })
    }

    const isAdmin = user.isAdmin
    const unhashedPassword = await bcrypt.compare(password, user.password)

    if (!unhashedPassword) {
      return res
        .status(HttpStatusCode.UNAUTHORIZED)
        .json({ message: ErrorAuth.INVALID_PASSWORD })
    }

    const token = generateJWT({ email, isAdmin })

    return res.status(HttpStatusCode.CREATED).json({ Token: "Bearer " + token })
  } catch (error) {
    if (error instanceof PrismaUniqueConstraintError) {
      return res
        .status(HttpStatusCode.CONFLICT)
        .json({ message: ErrorAuth.ALREADY_EXISTS })
    }

    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function getUserByEmail(req: Request, res: Response) {
  const { email } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: ErrorAuth.NOT_FOUND })
    }

    const { firstName, lastName, isAdmin } = user

    return res.status(HttpStatusCode.OK).json({
      email,
      firstName,
      lastName,
      isAdmin,
    })
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

export default { createUser, loginUser, getUserByEmail } as const
