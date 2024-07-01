import { Request, Response } from "express"
import { prisma } from "../utils/db"
import HttpStatusCode from "../const/httpStatusCode"
import { ErrorMsg } from "../const/errorMessages"

async function getShowtimes(_: Request, res: Response) {
  try {
    const showtimes = await prisma.showtime.findMany()

    if (!showtimes) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: ErrorMsg.NOT_FOUND })
    }
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function getShowtimeById(req: Request, res: Response) {
  const { id } = req.params

  if (!id) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: ErrorMsg.MISSING_FIELDS })
  }

  try {
    const showtime = await prisma.showtime.findUnique({
      where: {
        id: id,
      },
    })

    if (!showtime) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: ErrorMsg.NOT_FOUND })
    }
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function createShowtime(req: Request, res: Response) {
		const { movieId, screenId, startTime, endTime } = req.body

		if (!movieId || !screenId || !startTime || !endTime) {
				return res
						.status(HttpStatusCode.BAD_REQUEST)
						.json({ message: ErrorMsg.MISSING_FIELDS })
		}

		try {
				const showtime = await prisma.showtime.create({
						data: {
								movieId: movieId,
								screenId: screenId,
								startTime: startTime,
								endTime: endTime,
						},
				})

				return res
						.status(HttpStatusCode.CREATED)
						.json(showtime)
		} catch (error) {
				return res
						.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
						.json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
		}
}

async function updateShowtime (req: Request, res: Response) {
		const { id } = req.params
		const { movieId, screenId, startTime, endTime } = req.body

		if (!id || !movieId || !screenId || !startTime || !endTime) {
				return res
						.status(HttpStatusCode.BAD_REQUEST)
						.json({ message: ErrorMsg.MISSING_FIELDS })
		}

		try {
				const showtime = await prisma.showtime.update({
						where: {
								id: id,
						},
						data: {
								movieId: movieId,
								screenId: screenId,
								startTime: startTime,
								endTime: endTime,
						},
				})

				return res
						.status(HttpStatusCode.OK)
						.json(showtime)
		} catch (error) {
				return res
						.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
						.json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
		}
}

async function deleteShowtime(req: Request, res: Response) {
		const { id } = req.params

		if (!id) {
				return res
						.status(HttpStatusCode.BAD_REQUEST)
						.json({ message: ErrorMsg.MISSING_FIELDS })
		}

		try {
				const showtime = await prisma.showtime.delete({
						where: {
								id: id,
						},
				})

				return res
						.status(HttpStatusCode.OK)
						.json(showtime)
		} catch (error) {
				return res
						.status(HttpStatusCode.INTERNAL_SERVER_ERROR)
						.json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
		}
}

export default { getShowtimes, getShowtimeById, createShowtime, updateShowtime, deleteShowtime} as const