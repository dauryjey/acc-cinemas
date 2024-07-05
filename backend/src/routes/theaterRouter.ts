import { Router } from "express"
import TheaterController from "../controllers/TheaterController"
import { ValidateRole, ValidateToken } from "../middlewares/jwtMiddleware"
import { RequestValidator } from "../middlewares/requestValidator"
import TheaterSchema from "../schemas/TheaterSchema"

export const theaterRouter = Router()

theaterRouter.post(
  "/create",
  ValidateToken,
  ValidateRole,
  RequestValidator(TheaterSchema.theater),
  async (req, res) => TheaterController.createTheater(req, res)
)
theaterRouter.get("/all", async (req, res) =>
  TheaterController.getTheaters(req, res)
)
theaterRouter.get("/:id", ValidateToken, async (req, res) =>
  TheaterController.getTheaterById(req, res)
)
theaterRouter.put(
  "/:id",
  ValidateToken,
  ValidateRole,
  RequestValidator(TheaterSchema.theaterUpdate),
  async (req, res) => TheaterController.updateTheater(req, res)
)
theaterRouter.delete("/:id", ValidateToken, ValidateRole, async (req, res) =>
  TheaterController.deleteTheater(req, res)
)
