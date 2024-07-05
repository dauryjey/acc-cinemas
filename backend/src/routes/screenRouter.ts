import { Router } from "express"
import ScreenController from "../controllers/ScreenController"
import { ValidateRole, ValidateToken } from "../middlewares/jwtMiddleware"
import { RequestValidator } from "../middlewares/requestValidator"
import ScreenSchema from "../schemas/ScreenSchema"

export const screenRouter = Router()

screenRouter.get("/all", async (req, res) =>
  ScreenController.getScreens(req, res)
)

screenRouter.get("/:id", async (req, res) =>
  ScreenController.getScreenById(req, res)
)

screenRouter.post(
  "/create",
  ValidateToken,
  ValidateRole,
  RequestValidator(ScreenSchema.screen),
  async (req, res) => ScreenController.createScreen(req, res)
)

screenRouter.put(
  "/:id",
  ValidateToken,
  ValidateRole,
  RequestValidator(ScreenSchema.screenUpdate),
  async (req, res) => ScreenController.updateScreen(req, res)
)

screenRouter.delete("/:id", ValidateToken, ValidateRole, async (req, res) =>
  ScreenController.deleteScreen(req, res)
)
