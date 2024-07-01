import { Router } from "express"
import { userRouter } from "./userRouter"
import { theaterRouter } from "./theaterRouter"
import { screenRouter } from "./screenRouter"
import { movieRouter } from "./movieRouter"
import { showtimeRouter } from "./showtimeRouter"

const apiRouter = Router()

apiRouter.use("/users", userRouter)
apiRouter.use("/theaters", theaterRouter)
apiRouter.use("/screens", screenRouter)
apiRouter.use("/movies", movieRouter)
apiRouter.use("/showtimes", showtimeRouter)

export default apiRouter
