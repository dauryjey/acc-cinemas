import { Router } from "express"
import UserController from "../controllers/UserController"
import { RequestValidator } from "../middlewares/requestValidator"
import UserSchema from "../schemas/UserSchema"

export const userRouter = Router()

userRouter.post(
  "/signup",
  RequestValidator(UserSchema.user),
  async (req, res) => UserController.createUser(req, res)
)

userRouter.post(
  "/login",
  RequestValidator(UserSchema.userLogin),
  async (req, res) => UserController.loginUser(req, res)
)

userRouter.get(":email", async (req, res) =>
  UserController.getUserByEmail(req, res)
)
