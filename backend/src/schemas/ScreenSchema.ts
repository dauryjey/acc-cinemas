import { z } from "zod"

const screen = z.object({
		name: z.string().min(3, "Screen name must be at least 3 characters"),
		maxSeat: z.number().int().positive("Screen must have at least 1 seat"),
		theaterId: z.string().cuid("Screen must belong to a theater")
})

const screenUpdate = screen.partial()

export default	{ screen, screenUpdate } as const