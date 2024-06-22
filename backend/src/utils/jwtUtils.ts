import jwt from "jsonwebtoken"

const defaultSecret = "secret"

export const generateJWT = (payload: any) =>
  jwt.sign(payload, process.env.JWT_SECRET || defaultSecret, {
    expiresIn: "48h",
  })

export const verifyJWT = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET || defaultSecret )
