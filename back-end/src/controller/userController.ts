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
		console.log(req.body)
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

		req.user = {
			isAdmin,
			username,
		}

		res.json({ id, username, isAdmin }).end()
	} catch (error: unknown) {
		res.status(500).json({ Error: `Bad request`, stack: error }).end()
	}
}

const logout = async (req: Request, res: Response): Promise<void> => {
	req.session.destroy((err) => {
		console.error('Erro', err)
	})

	res.redirect('/')
}

const refresh = async (req: Request, res: Response): Promise<void> => {
	console.log(req.user)
	res.status(200).end()
}
export { signup, login, logout, refresh }
