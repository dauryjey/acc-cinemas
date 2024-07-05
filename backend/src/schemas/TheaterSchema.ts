import { z } from "zod"

const theater = z.object({
		name: z.string().min(3, "Theater name must be at least 3 characters long"),
		address: z.string().min(3, "Address must be at least 3 characters long"),
})

const theaterUpdate = theater.partial()

export default { theater, theaterUpdate } as const