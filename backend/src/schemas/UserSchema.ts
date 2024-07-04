import { z } from "zod"

const user = z.object({
  email: z.string().email(),
  firstName: z.string().min(3, "First name must be at least 3 characters long"),
  lastName: z.string().min(3, "Last name must be at least 3 characters long"),
  username: z.string().min(3),
  password: z.string().min(6),
  isAdmin: z.boolean(),
})

const userUpdate = user.partial()

const userLogin = user.pick({
  email: true,
  password: true,
})

export default { user, userUpdate, userLogin }
