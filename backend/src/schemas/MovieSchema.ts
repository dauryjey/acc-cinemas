import { z } from "zod"

const movie = z.object({
	title: z.string().min(3, "Movie title must be at least 3 characters"),
	sinopsis: z.string().min(3, "Movie sinopsis must be at least 3 characters"),
	duration: z.number().int().positive("Movie must have a duration"),
	releaseDate: z.date(),
	poster: z.string().url("Movie poster must be a valid URL"),
})

const movieUpdate = movie.partial()

export default { movie, movieUpdate } as const