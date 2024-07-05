import { Request, Response } from "express"
import HttpStatusCode from "../const/httpStatusCode"
import { ErrorMsg } from "../const/errorMessages"
import { prisma } from "../utils/db"
import { Prisma } from "@prisma/client"

async function getScreens(_: Request, res: Response) {
  try {
    // Remember to add pagination
    const screens = await prisma.screen.findMany()

    if (!screens) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: ErrorMsg.NOT_FOUND })
    }

    return res.status(HttpStatusCode.OK).json(screens)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function getScreenById(req: Request, res: Response) {
  const { id } = req.params

  if (!id) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: ErrorMsg.MISSING_FIELDS })
  }

  try {
    const screen = await prisma.screen.findUnique({
      where: {
        id: id,
      },
    })

    if (!screen) {
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

async function createScreen(req: Request, res: Response) {
  const { name, maxSeat, theaterId } =
    req.body as Prisma.ScreenUncheckedCreateInput

  if (!name || !maxSeat || !theaterId) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: ErrorMsg.MISSING_FIELDS })
  }

  try {
    const screen = await prisma.screen.create({
      data: {
        name,
        maxSeat,
        theater: {
          connect: {
            id: theaterId,
          }
        }
      },
    })
    return res.status(HttpStatusCode.CREATED).json(screen)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function updateScreen(req: Request, res: Response) {
  const { name, maxSeat } = req.body as Prisma.ScreenUpdateInput
  const { id } = req.params

  if (!id) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: ErrorMsg.MISSING_FIELDS })
  }

  if (!name && !maxSeat) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: ErrorMsg.MISSING_FIELDS })
  }

  try {
    const screen = await prisma.screen.update({
      where: {
        id: id,
      },
      data: {
        name,
        maxSeat,
      },
    })

    return res.status(HttpStatusCode.OK).json(screen)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function deleteScreen(req: Request, res: Response) {
  const { id } = req.params

  if (!id) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: ErrorMsg.MISSING_FIELDS })
  }

  try {
    await prisma.screen.delete({
      where: {
        id: id,
      },
    })

    return res.status(HttpStatusCode.NO_CONTENT).send()
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

export default { getScreens, getScreenById, createScreen, updateScreen, deleteScreen } as const