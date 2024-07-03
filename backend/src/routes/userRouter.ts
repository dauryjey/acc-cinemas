import { Router } from "express"
import UserController from "../controllers/UserController"
import { RequestValidator } from "../middlewares/requestValidator"
import { userSchema } from "../zod/UserSchema"

export const userRouter = Router()

userRouter.post("/signup", RequestValidator(userSchema), async (req, res) =>
  UserController.createUser(req, res)
)

userRouter.post(
  "/login",
  RequestValidator(
    userSchema.partial({
      username: true,
      firstName: true,
      lastName: true,
      isAdmin: true,
    })
  ),
  async (req, res) => UserController.loginUser(req, res)
)

userRouter.get(":email", async (req, res) =>
  UserController.getUserByEmail(req, res)
)
