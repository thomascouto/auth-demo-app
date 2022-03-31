import { UserRepository } from '@/database/userRepository'
import { User } from '@/domain/entities/user'
import { redis } from '@/config/setupRedis'
import { appToken } from '@/util/token'
import { Request, Response } from 'express'

export const refreshToken = async (req: Request, res: Response) => {
	const { refreshToken } = req.body
	if (!refreshToken)
		return res.status(400).json({ Error: 'Refresh token is needed!' }).end()

	try {
		const userRepository = new UserRepository()
		const user: User = await userRepository.findOneOrFail({ refreshToken })
		if (!user) {
			return res
				.status(400)
				.json({ Error: 'Refresh token not found on DB.' })
				.end()
		}

		if (!appToken.isValid(user.refreshToken)) {
			return res
				.status(403)
				.json({
					Error: 'Refresh token has expired. Please make a new signin request',
				})
				.end()
		}

		const newToken = appToken.generate({
			username: user.username,
			isAdmin: user.isAdmin,
		})

		redis.client.set(user.username, newToken)
		res
			.json({
				id: user.id,
				username: user.username,
				token: newToken,
				refreshToken,
			})
			.end()
	} catch (error) {
		return res.status(500).json({ Error: 'Server error' }).end()
	}

	return res.status(200).json({ hi: 10 }).end()
}
