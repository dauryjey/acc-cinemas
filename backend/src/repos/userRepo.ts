import { prisma } from "../utils/db"
import bcrypt from "bcrypt"
import { User } from "@prisma/client"

async function createUser(user: User): Promise<User> {
  const { email, firstName, lastName, username, password, isAdmin } = user

  const hashedPassword = await bcrypt.hash(password, 10)
	
  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        username,
        password: hashedPassword,
        isAdmin,
      },
    })

    return newUser
  } catch (error) {
    throw new Error("Error creating user")
  }
}


