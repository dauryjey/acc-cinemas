import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

const defaultSecret = "defaultSecret"

export const generateJWT = (payload: any) =>
  jwt.sign(payload, process.env.JWT_SECRET || defaultSecret, {
    expiresIn: "48h",
  })

export const verifyJWT = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET || defaultSecret )

export const getTokenFromHeader = (req: Request) => {
  return req.headers.authorization?.split(" ")[1]
}