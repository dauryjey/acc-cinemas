import { Router } from "express"
import MovieController from "../controllers/MovieController"
import { ValidateRole, ValidateToken } from "../middlewares/jwtMiddleware"
import MovieSchema from "../schemas/MovieSchema"
import { RequestValidator } from "../middlewares/requestValidator"

export const movieRouter = Router()

movieRouter.get("/all", MovieController.getMovies)
movieRouter.get("/:id", MovieController.getMovieById)
movieRouter.post(
  "/create",
  ValidateToken,
  ValidateRole,
  RequestValidator(MovieSchema.movie),
  MovieController.createMovie
)
movieRouter.put(
  "/:id",
  ValidateToken,
  ValidateRole,
  RequestValidator(MovieSchema.movieUpdate),
  MovieController.updateMovie
)
movieRouter.delete(
  "/:id",
  ValidateToken,
  ValidateRole,
  MovieController.deleteMovie
)
