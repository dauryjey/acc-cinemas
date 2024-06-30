import { Router } from "express"
import ScreenController from "../controllers/ScreenController"
import { isAdmin, validateToken } from "../middlewares/jwtMiddleware"

export const screenRouter = Router()

screenRouter.get("/all", async (req, res) =>
		ScreenController.getScreens(req, res)
)

screenRouter.get("/:id", async (req, res) =>
		ScreenController.getScreenById(req, res)
)

screenRouter.post("/create", validateToken, isAdmin, async (req, res) =>
		ScreenController.createScreen(req, res)
)

screenRouter.put("/:id", validateToken, isAdmin, async (req, res) =>
		ScreenController.updateScreen(req, res)
)

screenRouter.delete("/:id", validateToken, isAdmin, async (req, res) =>
		ScreenController.deleteScreen(req, res)
)
