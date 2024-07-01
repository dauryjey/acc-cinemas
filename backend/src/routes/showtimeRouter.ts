import { Router } from "express"
import ShowtimeController from "../controllers/ShowtimeController"
import { isAdmin, validateToken } from "../middlewares/jwtMiddleware"

export const showtimeRouter = Router()

showtimeRouter.get("/all", ShowtimeController.getShowtimes)
showtimeRouter.get(
  "/:id",
  validateToken,
  isAdmin,
  ShowtimeController.getShowtimeById
)
showtimeRouter.post(
  "/create",
  validateToken,
  isAdmin,
  ShowtimeController.createShowtime
)
showtimeRouter.put(
  "/:id",
  validateToken,
  isAdmin,
  ShowtimeController.updateShowtime
)

showtimeRouter.delete(
		"/:id",
		validateToken,
		isAdmin,
		ShowtimeController.deleteShowtime
)