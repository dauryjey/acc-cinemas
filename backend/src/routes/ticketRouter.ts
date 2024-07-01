import { Router } from "express"
import TicketController from "../controllers/TicketController"

export const ticketRouter = Router()

ticketRouter.get("/all", TicketController.getTickets)
ticketRouter.get("/:id", TicketController.getTicketById)
ticketRouter.post("/create", TicketController.createTicket)
ticketRouter.put("/:id", TicketController.updateTicket)
ticketRouter.delete("/:id", TicketController.deleteTicket)