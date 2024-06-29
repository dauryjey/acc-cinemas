import { Router } from "express"
import TheaterController from "../controllers/TheaterController"
import { isAdmin, validateToken } from "../middlewares/jwtMiddleware"

export const theaterRouter = Router()

theaterRouter.post("/create", validateToken, isAdmin, async (req, res) =>
  TheaterController.createTheater(req, res)
)
theaterRouter.get("/all", async (req, res) =>
  TheaterController.getTheaters(req, res)
)
theaterRouter.get("/:id", validateToken, isAdmin, async (req, res) =>
  TheaterController.getTheaterById(req, res)
)
theaterRouter.put("/:id", validateToken, isAdmin, async (req, res) =>
  TheaterController.updateTheater(req, res)
)
theaterRouter.delete("/:id", validateToken, isAdmin, async (req, res) =>
  TheaterController.deleteTheater(req, res)
)
