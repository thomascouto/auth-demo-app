import { verify } from 'jsonwebtoken'
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
		if (err) {
			return res.status(401).send({
				message: `Unauthorized! ${err}`,
			})
		}
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
			message: '403 Forbidden',
		})
	}
	next()
}

const authJwt = {
	verifyToken,
	verifyRules,
}

export default authJwt
