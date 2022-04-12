import { cookies } from '@/config/cookies'
import connectRedis from 'connect-redis'
import session from 'express-session'
import { RedisClientType } from 'redis'

const RedisStore = connectRedis(session)

export const appSession = (client: RedisClientType) => {
	return session({
		store: new RedisStore({
			client,
			disableTouch: true,
			logErrors: process.env.TS_NODE_DEV ? true : false,
		}),
		secret: process.env.COOKIE_SECRET as string,
		resave: true,
		saveUninitialized: true,
		cookie: cookies.options,
		name: cookies.name,
	})
}
