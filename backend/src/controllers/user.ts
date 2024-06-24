import { prisma } from "../utils/db"
import bcrypt from "bcrypt"
import { Prisma } from "@prisma/client"
import {
  PrismaUniqueConstraintError,
  toTypedPrismaError,
} from "../utils/prismaErrors"
import { AuthErrors, GeneralErrors } from "../utils/errors"
import { Request, Response } from "express"
import { generateJWT } from "../utils/jwtUtils"

async function createUser(req: Request, res: Response) {
  const { email, firstName, lastName, password, isAdmin } =
    req.body as Prisma.UserCreateInput
  const hashedPassword = await bcrypt.hash(password, 10)
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        isAdmin,
      },
    })

    const userJwt = generateJWT({
      email: newUser.email,
      isAdmin: newUser.isAdmin,
    })

    return res.status(201).send({ Token: `Bearer ${userJwt}` })
  } catch (error) {
    if (toTypedPrismaError(error) instanceof PrismaUniqueConstraintError) {
      return res
        .status(400)
        .send({ message: AuthErrors.ALREADY_EXISTS, code: 400 })
    }

    return res
      .status(500)
      .send({ message: GeneralErrors.SOMETHING_WENT_WRONG, code: 500 })
  }
}

async function getUserByEmail(req: Request, res: Response) {
  const { email } = req.body as Prisma.UserCreateInput
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return res.status(404).send(AuthErrors.NOT_FOUND)
    }

    return res.status(200).send({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    })
  } catch (error) {
    return res.status(500).send(GeneralErrors.SOMETHING_WENT_WRONG)
  }
}

export default { createUser, getUserByEmail } as const
