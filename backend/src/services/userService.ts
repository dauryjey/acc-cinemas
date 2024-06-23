import { Prisma } from "@prisma/client"
import userRepo from "../repos/UserRepo"
import { generateJWT } from "../utils/jwtUtils"

async function createUser(user: Prisma.UserCreateInput): Promise<{ Token: string }> {
  const newUser = await userRepo.createUser(user)
  const userJwt = generateJWT({
    email: newUser.email,
    isAdmin: newUser.isAdmin,
  })

  return { Token: `Bearer ${userJwt}` }
}

async function loginUser(
  email: string,
  password: string
): Promise<{ Token: string }> {
  const user = await userRepo.getUserByEmail(email)
  if (!user) {
    throw new Error("User not found")
  }

  if (user.password !== password) {
    throw new Error("Invalid password")
  }

  const userJwt = generateJWT({
    email: user.email,
    isAdmin: user.isAdmin,
  })

  return { Token: `Bearer ${userJwt}` }
}

async function getUserByEmail(email: string): Promise<Prisma.UserCreateInput | null> {
  const user = await userRepo.getUserByEmail(email)
  return user
}

export default { createUser, loginUser, getUserByEmail } as const
