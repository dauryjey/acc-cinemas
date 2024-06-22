import { prisma } from "../utils/db"
import bcrypt from "bcrypt"
import { User } from "@prisma/client"
import {
  PrismaUniqueConstraintError,
  toTypedPrismaError,
} from "../utils/prismaErrors"

async function createUser(user: User): Promise<User> {
  const { email, firstName, lastName, password, isAdmin } = user

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

    return newUser
  } catch (error) {
    if (toTypedPrismaError(error) instanceof PrismaUniqueConstraintError) {
      throw new Error("Email already exists")
    }

    throw new Error("Error creating user")
  }
}

async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  } catch (error) {
    throw new Error("Error getting user by email")
  }
}

export default { createUser, getUserByEmail } as const
