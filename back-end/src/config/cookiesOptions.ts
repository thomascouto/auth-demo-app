import { CookieOptions } from 'express'

const cookieOptions = {
	// secure: process.env.TS_NODE_DEV ? false : true,
	secure: true,
	maxAge: 60 * 60 * 1000,
	httpOnly: true,
	// path: '/',
	// signed: false,
	sameSite: 'none',
} as CookieOptions

const cookieName = 'auth'

export { cookieName, cookieOptions }
