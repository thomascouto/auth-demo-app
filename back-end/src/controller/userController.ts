import { redis } from '@/config'
import { cookies } from '@/config/cookies'
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

		req.session.regenerate((err) => {
			if (err) {
				throw new Error((err as Error).message)
			}
			res
				.cookie('username', username, cookies.options)
				.cookie('logged_in', 'yes', cookies.options)
				.cookie('SESSION', req.sessionID, cookies.options)
				.status(200)
				.json({ id, username, isAdmin, session: req.sessionID })
				.end()
		})
	} catch (error: unknown) {
		res.status(500).json({ Error: `Bad request`, stack: error }).end()
	}
}

const logout = (req: Request, res: Response): void => {
	req.session.destroy((err) => {
		if (err) res.status(500).json(err).end()
	})
	res.clearCookie('username')
	res.clearCookie('SESSION')
	res.clearCookie('auth')
	res.cookie('logged_in', 'no', cookies.options)
	res.sendStatus(200)
}

const refresh = async (req: Request, res: Response): Promise<void> => {
	const session = req.cookies['SESSION']
	if (session === req.sessionID) {
		const username = req.cookies['username']
		const sessionCookies =
			JSON.parse(await redis.client.v4.GET('sess:'.concat(session)))['cookie'][
				'expires'
			] ?? null
		const isExpired = sessionCookies
			? new Date(sessionCookies) < new Date()
			: true
		if (username && !isExpired) {
			const qb = new UserRepository().qb()
			const { id, isAdmin }: User = await qb.where({ username }).execute('get')
			res
				.json({ id, username, isAdmin, session: req.sessionID })
				.status(200)
				.end()
			return
		}
	}
	res.sendStatus(403)
}
export { signup, login, logout, refresh }
