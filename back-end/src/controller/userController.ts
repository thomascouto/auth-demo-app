import { redis } from '@/config/setupRedis'
import { UserRepository } from '@/database/userRepository'
import { User } from '@/domain/entities/user'
import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'

type LoginCredentials = {
	username: string
	password: string
}

export const signup = async (req: Request, res: Response): Promise<void> => {
	const { username, password }: LoginCredentials = req.body
	try {
		if (username !== undefined && password !== undefined) {
			const userRepository = new UserRepository()
			const { isAdmin } = req.body
			const user = new User({
				username: username.trim(),
				password: password.trim(),
				isAdmin: isAdmin ? isAdmin : false,
			})
			await userRepository.persistAndFlush(user)
			res.status(201).end()
			return
		}
		throw new Error()
	} catch (error: unknown) {
		res.status(500).json({ Error: `Bad request`, stack: error }).end()
	}
}

export const signin = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, password }: LoginCredentials = req.body
		const userRepository = new UserRepository()
		const query: User = await userRepository
			.qb()
			.where({ username: username, password: password })
			.execute('get')

		if (query === null) {
			res.status(401).json({ Error: 'Not authorized' }).end()
			return
		}

		const { id, isAdmin } = query
		const token = sign(
			{ username, isAdmin },
			process.env.JWT_SECRET as string,
			{
				expiresIn: process.env.JWT_EXPIRATION,
			}
		)
		await redis.client.set(username, token)
		res.json({ id, username, token }).end()
	} catch (error: unknown) {
		res.status(500).json({ Error: `Bad request`, stack: error }).end()
	}
}

export const signout = async (req: Request, res: Response): Promise<void> => {
	const { username } = req.body
	const result = await redis.client.del(username)
	res.status(200).json({ result }).end()
}
