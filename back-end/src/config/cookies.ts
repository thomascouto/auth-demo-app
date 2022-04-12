import { CookieOptions } from 'express'

export const cookies = {} as {
	options: CookieOptions
	name: string
}

cookies.name = 'auth'
cookies.options = {
	secure: process.env.TS_NODE_DEV ? false : true,
	maxAge: 60 * 60 * 1000,
	httpOnly: true,
	path: '/',
} as CookieOptions
