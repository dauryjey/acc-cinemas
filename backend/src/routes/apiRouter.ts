import { Router } from "express"
import { userRouter } from "./userRouter"
import { theaterRouter } from "./theaterRouter"
import { screenRouter } from "./screenRouter"
import { movieRouter } from "./movieRouter"

const apiRouter = Router()

apiRouter.use("/users", userRouter)
apiRouter.use("/theaters", theaterRouter)
apiRouter.use("/screens", screenRouter)
apiRouter.use("/movies", movieRouter)

export default apiRouter
