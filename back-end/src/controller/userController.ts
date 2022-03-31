import { redis } from '@/config/setupRedis'
import { UserRepository } from '@/database/userRepository'
import { User } from '@/domain/entities/user'
import { appToken } from '@/util/token'
import { wrap } from '@mikro-orm/core'
import { Request, Response } from 'express'

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
		const qb = userRepository.qb()
		const query: User = await qb
			.where({ username: username, password: password })
			.execute('get')

		if (query === null) {
			res.status(401).json({ Error: 'Not authorized' }).end()
			return
		}

		const { id, isAdmin } = query
		let { refreshToken } = query
		const token = appToken.generate({ username, isAdmin })

		if (!refreshToken || !appToken.isValid(refreshToken)) {
			refreshToken = appToken.generate(
				{
					username,
					isAdmin,
				},
				true
			)
			const entity = await userRepository.findOne({ username })
			wrap(entity).assign({
				refreshToken,
			})
			await userRepository.flush()
		}

		await redis.client.set(username, token)
		res.json({ id, username, token, refreshToken }).end()
	} catch (error: unknown) {
		console.log(error)
		res.status(500).json({ Error: `Bad request`, stack: error }).end()
	}
}

export const signout = async (req: Request, res: Response): Promise<void> => {
	const { username } = req.body
	const result = await redis.client.del(username)
	res.status(200).json({ result }).end()
}
