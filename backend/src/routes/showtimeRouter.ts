import { Router } from "express"
import ShowtimeController from "../controllers/ShowtimeController"
import { ValidateRole, ValidateToken } from "../middlewares/jwtMiddleware"
import { RequestValidator } from "../middlewares/requestValidator"
import ShowtimeSchema from "../schemas/ShowtimeSchema"

export const showtimeRouter = Router()

showtimeRouter.get("/all", ShowtimeController.getShowtimes)
showtimeRouter.get(
  "/:id",
  ValidateToken,
  ValidateRole,
  ShowtimeController.getShowtimeById
)
showtimeRouter.post(
  "/create",
  ValidateToken,
  ValidateRole,
  RequestValidator(ShowtimeSchema.showtime),
  ShowtimeController.createShowtime
)
showtimeRouter.put(
  "/:id",
  ValidateToken,
  ValidateRole,
  RequestValidator(ShowtimeSchema.showtimeUpdate),
  ShowtimeController.updateShowtime
)

showtimeRouter.delete(
  "/:id",
  ValidateToken,
  ValidateRole,
  ShowtimeController.deleteShowtime
)
