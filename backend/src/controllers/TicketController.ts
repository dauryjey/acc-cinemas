import { Request, Response } from "express"
import { prisma } from "../utils/db"
import HttpStatusCode from "../const/httpStatusCode"
import { ErrorMsg } from "../const/errorMessages"
import { Prisma } from "@prisma/client"

async function getTickets(_: Request, res: Response) {
  try {
    const tickets = await prisma.ticket.findMany()

    if (!tickets) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: ErrorMsg.NOT_FOUND })
    }

    res.status(HttpStatusCode.OK).json(tickets)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function getTicketById(req: Request, res: Response) {
  const { id } = req.params

  if (!id) {
    return res
      .status(HttpStatusCode.NOT_FOUND)
      .json({ message: ErrorMsg.NOT_FOUND })
  }

  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: id,
      },
    })

    if (!ticket) {
      return res
        .status(HttpStatusCode.NOT_FOUND)
        .json({ message: ErrorMsg.NOT_FOUND })
    }

    res.status(HttpStatusCode.OK).json(ticket)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function createTicket(req: Request, res: Response) {
  const { quantity, totalPrice, userId, showtimeId } =
    req.body as Prisma.TicketUncheckedCreateInput

  if (!quantity || !totalPrice || !userId || !showtimeId) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: ErrorMsg.MISSING_FIELDS })
  }

  try {
    const ticket = await prisma.ticket.create({
      data: {
        quantity,
        totalPrice,
        userId,
        showtimeId,
      },
    })

    res.status(HttpStatusCode.CREATED).json(ticket)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function updateTicket(req: Request, res: Response) {
  const { id } = req.params

  if (!id) {
    res.status(HttpStatusCode.NOT_FOUND).json({ message: ErrorMsg.NOT_FOUND })
  }

  const { quantity, totalPrice, userId, showtimeId } =
    req.body as Prisma.TicketUncheckedCreateInput

  if (!quantity || !totalPrice || !userId || !showtimeId) {
    return res
      .status(HttpStatusCode.BAD_REQUEST)
      .json({ message: ErrorMsg.MISSING_FIELDS })
  }

  try {
    const ticket = await prisma.ticket.update({
      where: {
        id: id,
      },
      data: {
        quantity,
        totalPrice,
        userId,
        showtimeId,
      },
    })

    res.status(HttpStatusCode.OK).json(ticket)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

async function deleteTicket(req: Request, res: Response) {
  const { id } = req.params

  if (!id) {
    res.status(HttpStatusCode.NOT_FOUND).json({ message: ErrorMsg.NOT_FOUND })
  }

  try {
    const ticket = await prisma.ticket.delete({
      where: {
        id: id,
      },
    })

    res.status(HttpStatusCode.OK).json(ticket)
  } catch (error) {
    return res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: ErrorMsg.SOMETHING_WENT_WRONG })
  }
}

export default {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} as const
