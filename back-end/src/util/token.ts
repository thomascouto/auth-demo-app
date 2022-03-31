import { verify, sign } from 'jsonwebtoken'

type TokenPayload = {
	username: string
	isAdmin: boolean
}

const generate = (
	{ username, isAdmin }: TokenPayload,
	isRefreshToken = false
): string => {
	return sign({ username, isAdmin }, process.env.JWT_SECRET as string, {
		expiresIn: isRefreshToken
			? process.env.JWT_REFRESH_EXPIRATION
			: (process.env.JWT_EXPIRATION as string),
	})
}

const isValid = (token: string): boolean => {
	let result = true
	verify(token, process.env.JWT_SECRET as string, (err) => {
		if (err) {
			result = false
		}
	})
	return result
}

export const appToken = { isValid, generate }
