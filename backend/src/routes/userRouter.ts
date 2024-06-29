import { Router } from "express"
import UserController from "../controllers/UserController"

export const userRouter = Router()

userRouter.post("/signup", async (req, res) =>
  UserController.createUser(req, res)
)
userRouter.post("/login", async (req, res) =>
  UserController.loginUser(req, res)
)
userRouter.get(":email", async (req, res) =>
  UserController.getUserByEmail(req, res)
)
