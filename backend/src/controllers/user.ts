import { prisma } from "../utils/db"
import bcrypt from "bcrypt"
import { Prisma } from "@prisma/client"
import { PrismaUniqueConstraintError } from "../utils/prismaErrors"
import { ErrorAuth, ErrorMsg } from "../utils/errorMessages"
import { Request, Response } from "express"
import { generateJWT } from "../utils/jwtUtils"
import HttpStatusCode from "../utils/httpStatusCode"

async function createUser(req: Request, res: Response) {
  const { email, firstName, lastName, password, isAdmin } =
    req.body as Prisma.UserCreateInput

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

    return res.status(HttpStatusCode.CREATED).send({ Token: "Bearer " + token })
  } catch (error) {
    if (error instanceof PrismaUniqueConstraintError) {
      return res.status(HttpStatusCode.CONFLICT).send(ErrorAuth.ALREADY_EXISTS)
    }

    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(ErrorMsg.SOMETHING_WENT_WRONG)
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
      return res.status(HttpStatusCode.NOT_FOUND).send(ErrorAuth.NOT_FOUND)
    }

    const { firstName, lastName, isAdmin } = user

    return res.status(HttpStatusCode.OK).send({
      email,
      firstName,
      lastName,
      isAdmin,
    })
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .send(ErrorMsg.SOMETHING_WENT_WRONG)
  }
}

export default { createUser, getUserByEmail } as const
