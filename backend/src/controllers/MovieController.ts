import { Request, Response } from "express"
import { prisma } from "../utils/db"
import HttpStatusCode from "../const/httpStatusCode"
import { ErrorMsg } from "../const/errorMessages"
import { Prisma } from "@prisma/client"

async function getMovies(_: Request, res: Response) {
  try {
    const movies = prisma.movie.findMany()

    if (!movies) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: ErrorMsg.NOT_FOUND })
    }

    return res.status(HttpStatusCode.OK).json(movies)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function getMovieById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const movie = prisma.movie.findUnique({
      where: {
        id: id,
      },
    })

    if (!movie) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: ErrorMsg.NOT_FOUND })
    }

    return res.status(HttpStatusCode.OK).json(movie)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function createMovie(req: Request, res: Response) {
  const { title, sinopsis, duration, releaseDate, poster } =
    req.body as Prisma.MovieCreateInput

  if (!title || !sinopsis || !duration || !releaseDate || !poster) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: ErrorMsg.MISSING_FIELDS })
  }

  try {
    const movie = prisma.movie.create({
      data: {
        title,
        sinopsis,
        duration,
        releaseDate,
        poster,
      },
    })

    return res.status(HttpStatusCode.CREATED).json(movie)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function updateMovie(req: Request, res: Response) {
  const { id } = req.params
  const { title, sinopsis, duration, releaseDate, poster } =
    req.body as Prisma.MovieUpdateInput

  if (!id || !title || !sinopsis || !duration || !releaseDate || !poster) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: ErrorMsg.MISSING_FIELDS })
  }

  try {
    const movie = prisma.movie.update({
      where: {
        id: id,
      },
      data: {
        title,
        sinopsis,
        duration,
        releaseDate,
        poster,
      },
    })

    return res.status(HttpStatusCode.OK).json(movie)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function deleteMovie(req: Request, res: Response) {
  const { id } = req.params

  if (!id) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: ErrorMsg.MISSING_FIELDS })
  }

  try {
    const movie = prisma.movie.delete({
      where: {
        id: id,
      },
    })

    return res.status(HttpStatusCode.OK).json(movie)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

export default {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} as const
