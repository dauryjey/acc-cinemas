import { Request, Response, NextFunction } from "express"
import { ErrorAuth } from "../const/errorMessages"
import HttpStatusCode from "../const/httpStatusCode"
import { getTokenFromHeader, verifyJWT } from "../utils/jwt"

function validateToken(req: Request, res: Response, next: NextFunction) {
  const token = getTokenFromHeader(req)

  if (!token) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: ErrorAuth.NOT_AUTHENTICATED })
  }

  try {
    const decodedToken = verifyJWT(token)
				console.log(decodedToken)
    req.body.user = decodedToken

    next()
  } catch (error) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: ErrorAuth.INVALID_TOKEN })
  }
}

function isAdmin(req: Request, res: Response, next: NextFunction) {
	console.log(req.body.user)
  if (req.body.user.isAdmin) {
    next()
  } else {
    return res
      .status(HttpStatusCode.FORBIDDEN)
      .json({ message: ErrorAuth.NOT_AUTHORIZED })
  }
}

export { validateToken, isAdmin }
