import { Router } from "express"
import { userRouter } from "./userRouter"
import { theaterRouter } from "./theaterRouter"

const apiRouter = Router()

apiRouter.use("/users", userRouter)
apiRouter.use("/theaters", theaterRouter)

export default apiRouter
