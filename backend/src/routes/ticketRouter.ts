import { Router } from "express"
import TicketController from "../controllers/TicketController"
import { ValidateRole, ValidateToken } from "../middlewares/jwtMiddleware"
import ShowtimeSchema from "../schemas/ShowtimeSchema"
import { RequestValidator } from "../middlewares/requestValidator"

export const ticketRouter = Router()

ticketRouter.get(
  "/all",
  ValidateToken,
  ValidateRole,
  TicketController.getTickets
)
ticketRouter.get("/:id", ValidateToken, TicketController.getTicketById)
ticketRouter.post(
  "/create",
  ValidateToken,
  RequestValidator(ShowtimeSchema.showtime),
  TicketController.createTicket
)
ticketRouter.put(
  "/:id",
  ValidateToken,
  ValidateRole,
  RequestValidator(ShowtimeSchema.showtimeUpdate),
  TicketController.updateTicket
)
ticketRouter.delete(
  "/:id",
  ValidateToken,
  ValidateRole,
  TicketController.deleteTicket
)
