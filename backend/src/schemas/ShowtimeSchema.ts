import { z } from "zod"

const showtime = z.object({
  movieId: z.string().min(3, "Showtime must have a movie"),
  screenId: z.string().cuid("Showtime must have a screen"),
  startTime: z.string().min(3, "Showtime must have a start time"),
  endTime: z.string().min(3, "Showtime must have an end time"),
})

const showtimeUpdate = showtime.partial()

export default { showtime, showtimeUpdate } as const