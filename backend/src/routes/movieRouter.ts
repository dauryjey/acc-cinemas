import { Router } from "express"
import MovieController from "../controllers/MovieController"
import { isAdmin, validateToken } from "../middlewares/jwtMiddleware"

export const movieRouter = Router()

movieRouter.get("/all", MovieController.getMovies)
movieRouter.get("/:id", MovieController.getMovieById)
movieRouter.post("/create", validateToken, isAdmin, MovieController.createMovie)
movieRouter.put("/:id", validateToken, isAdmin, MovieController.updateMovie)
movieRouter.delete("/:id", validateToken, isAdmin, MovieController.deleteMovie)