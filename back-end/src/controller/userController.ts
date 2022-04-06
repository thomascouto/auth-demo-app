import { UserRepository } from '@/database/userRepository'
import { User } from '@/domain/entities/user'
import { Request, Response } from 'express'

type LoginCredentials = {
	username: string
	password: string
}

const signup = async (req: Request, res: Response): Promise<void> => {
	const { username, password } = req.body

	try {
		if (username !== undefined && password !== undefined) {
			const userRepository = new UserRepository()
			const user = new User({
				username: username.trim(),
				password: password.trim(),
				isAdmin: req.body.isAdmin ?? false,
			})
			await userRepository.persistAndFlush(user)
			res.status(201).end()
			return
		}
		throw new Error('Mandatory field(s) not found.')
	} catch (error: unknown) {
		res
			.status(400)
			.json({ error: `Bad request`, msg: (error as Error).message })
			.end()
	}
}

const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username, password }: LoginCredentials = req.body
		const qb = new UserRepository().qb()
		const query: User = await qb.where({ username, password }).execute('get')

		if (query === null) {
			res.status(401).json({ Error: 'Not authorized' }).end()
			return
		}

		const { id, isAdmin } = query

		req.user = {
			isAdmin,
			username,
		}

		req.isAuthenticated = true
		res.status(200).json({ id, username, isAdmin }).end()
	} catch (error: unknown) {
		res.status(500).json({ Error: `Bad request`, stack: error }).end()
	}
}

const logout = async (req: Request, res: Response): Promise<void> => {
	req.session.destroy((err) => {
		if (err) res.status(500).json(err).end()
		else {
			res.clearCookie('/').status(200).end()
			req.isAuthenticated = false
		}
	})
}

const refresh = async (req: Request, res: Response): Promise<void> => {
	if (!req.isAuthenticated) {
		res.sendStatus(403)
		return
	}

	const qb = new UserRepository().qb()
	const { id, username, isAdmin }: User = await qb
		.where({ username: req.user.username })
		.execute('get')

	res.status(200).json({ id, username, isAdmin }).end()
}
export { signup, login, logout, refresh }
