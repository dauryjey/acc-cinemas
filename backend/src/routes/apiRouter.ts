import { Router } from "express"
import { userRouter } from "./userRouter"
import { theaterRouter } from "./theaterRouter"
import { screenRouter } from "./screenRouter"

const apiRouter = Router()

apiRouter.use("/users", userRouter)
apiRouter.use("/theaters", theaterRouter)
apiRouter.use("/screens", screenRouter)

export default apiRouter
