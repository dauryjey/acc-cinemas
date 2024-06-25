import { Router } from "express"
import { userRouter } from "./userRouter"

const apiRouter = Router()

apiRouter.use("/users", userRouter)

export	default apiRouter