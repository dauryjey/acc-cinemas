import express, { Application } from "express"
import cookieParser from "cookie-parser"
import logger from "morgan"
import apiRouter from "./routes/apiRouter"

const app: Application = express()

app.use(logger(process.env.NODE_ENV === "production" ? "common" : "dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use("/api/v1", apiRouter) 

export default app
