import { CookieOptions } from 'express'

const cookieOptions = {
	secure: process.env.TS_NODE_DEV ? false : true,
	maxAge: 60 * 60 * 1000,
	httpOnly: true,
} as CookieOptions

const cookieName = 'auth.cookie'

export { cookieName, cookieOptions }
