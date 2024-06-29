import { Request, Response } from "express"
import HttpStatusCode from "../const/httpStatusCode"
import { ErrorMsg } from "../const/errorMessages"
import { prisma } from "../utils/db"
import { Prisma } from "@prisma/client"

async function getTheaters(req: Request, res: Response) {
  try {
    const theaters = await prisma.theater.findMany()

    if (!theaters) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: ErrorMsg.NOT_FOUND })
    }

    return res.status(HttpStatusCode.OK).json(theaters)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function createTheater(req: Request, res: Response) {
  const { name, address } = req.body as Prisma.TheaterCreateInput

  if (!name || !address) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: ErrorMsg.MISSING_FIELDS })
  }

  try {
    const theater = await prisma.theater.create({
      data: {
        name,
        address,
      },
    })

    return res.status(HttpStatusCode.CREATED).json(theater)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function getTheaterById(req: Request, res: Response) {
  const { id } = req.params

  try {
    const theater = await prisma.theater.findUnique({
      where: {
        id: id,
      },
    })

    if (!theater) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: ErrorMsg.NOT_FOUND })
    }

    return res.status(HttpStatusCode.OK).json(theater)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function updateTheater(req: Request, res: Response) {
  const { name, address } = req.body as Prisma.TheaterUpdateInput
  const { id } = req.params

  if (!id) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: ErrorMsg.MISSING_FIELDS })
  }

  if (!name && !address) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: ErrorMsg.MISSING_FIELDS })
  }

  try {
    const theater = await prisma.theater.update({
      where: {
        id,
      },
      data: {
        name: name || undefined,
        address: address || undefined,
      },
    })

    return res.status(HttpStatusCode.OK).json(theater)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function deleteTheater(req: Request, res: Response) {
  const { id } = req.params

  if (!id) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: ErrorMsg.MISSING_FIELDS })
  }

  try {
    await prisma.theater.delete({
      where: {
        id,
      },
    })

    return res.status(HttpStatusCode.NO_CONTENT).json()
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

export default { getTheaters, createTheater, getTheaterById, updateTheater, deleteTheater} as const