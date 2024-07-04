import { Router } from "express"
import TicketController from "../controllers/TicketController"
import { isAdmin, validateToken } from "../middlewares/jwtMiddleware"

export const ticketRouter = Router()

ticketRouter.get("/all", validateToken, isAdmin, TicketController.getTickets)
ticketRouter.get("/:id", validateToken, TicketController.getTicketById)
ticketRouter.post("/create", validateToken, TicketController.createTicket)
ticketRouter.put("/:id", validateToken, isAdmin, TicketController.updateTicket)
ticketRouter.delete("/:id", validateToken, isAdmin, TicketController.deleteTicket)