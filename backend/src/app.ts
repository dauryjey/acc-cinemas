import express, {Application } from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";

// app
const app: Application = express();

// plugins
app.use(logger(process.env.NODE_ENV === "production" ? "common" : "dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

export default app;
