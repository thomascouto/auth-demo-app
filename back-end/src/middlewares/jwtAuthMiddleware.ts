import { TokenExpiredError, verify } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

type JwtPayload = {
	username: string
	isAdmin: boolean
	iat: number
	exp: number
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers['x-access-token'] as string
	if (!token) {
		return res.status(403).send({
			message: 'No token provided!',
		})
	}
	verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
		if (err) catchError(err, res)
		const { username, isAdmin } = decoded as JwtPayload
		req.user = {
			username,
			isAdmin,
		}
		next()
	})
}

const verifyRules = (req: Request, res: Response, next: NextFunction) => {
	if (!req.user.isAdmin) {
		return res.status(403).send({
			message: `403 Forbidden: Admin: ${req.user.isAdmin}.`,
		})
	}
	next()
}

const catchError = (err: unknown, res: Response) => {
	if (err instanceof TokenExpiredError) {
		return res
			.status(401)
			.send({ message: 'Unauthorized! Access Token was expired!' })
			.end()
	}
	return res.status(401).send({ message: 'Unauthorized!' }).end()
}

const authJwt = {
	verifyToken,
	verifyRules,
}

export default authJwt
