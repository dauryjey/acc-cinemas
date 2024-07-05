import { z } from "zod"

const	ticket = z.object({
		userId: z.string().cuid("Ticket must belong to a user"),
		showtimeId: z.string().cuid("Ticket must belong to a showtime"),
		quantity: z.number().int().positive("Ticket must have a quantity"),
		seat: z.string().min(1, "Ticket must have a seat"),
})

const ticketUpdate = ticket.partial()

export default { ticket, ticketUpdate } as const