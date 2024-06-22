import { User } from "@prisma/client"
import userRepo from "../repos/userRepo"
import { generateJWT } from "../utils/jwtUtils"

async function createUser(user: User): Promise<{ JWT: string }> {
  const newUser = await userRepo.createUser(user)
  const userJwt = generateJWT({
    email: newUser.email,
    isAdmin: newUser.isAdmin,
  })

  return { JWT: userJwt }
}

async function getUserByEmail(email: string): Promise<User | null> {
  const user = await userRepo.getUserByEmail(email)
  return user
}

export default { createUser, getUserByEmail } as const
