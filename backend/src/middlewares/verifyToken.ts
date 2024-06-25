import { Request, Response, NextFunction } from "express"
import { ErrorAuth } from "../utils/errorMessages"
import HttpStatusCode from "../utils/httpStatusCode"
import { verifyJWT } from "../utils/jwtUtils"

export function verifyToken (req: Request, res: Response, next: NextFunction) {
	const token = req.headers.authorization?.split("	")[1]

	if (!token) {
		return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: ErrorAuth.NOT_AUTHENTICATED })
	}
	
	try {
		const decodedToken = verifyJWT(token)

		req.body.user = decodedToken

		next()
	} catch (error) {
		return res.status(HttpStatusCode.UNAUTHORIZED).json({ message: ErrorAuth.INVALID_TOKEN	 })
	}
}