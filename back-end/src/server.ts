import './config/moduleAlias'
import 'dotenv/config'
import express from 'express'
import http from 'http'
import session from 'express-session'
import connectRedis from 'connect-redis'
import { MikroORM, RequestContext } from '@mikro-orm/core'
import { EntityManager } from '@mikro-orm/postgresql'
import { setupRoutes, setupRedis } from '@/config'
import helmet from 'helmet'
import logger from 'morgan'
import { redis } from './config/setupRedis'

export const DI = {} as {
	server: http.Server
	orm: MikroORM
	em: EntityManager
}

const port = process.env.SERVER_PORT || 3000
const app = express()

const init = async () => {
	DI.orm = await MikroORM.init()
	DI.em = DI.orm.em as EntityManager

	const isConnected = await DI.orm.isConnected()
	if (!isConnected) {
		console.info('DB not connected. Exiting...')
		process.exit(1)
	}
	console.info('DB status: Connected...')

	if (process.env.TS_NODE_DEV) app.use(logger('short'))
	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
	app.set('trust proxy', 1)

	await setupRedis()
	const RedisStore = connectRedis(session)

	app.use(function (req, res, next) {
		res.header('Access-Control-Allow-Credentials', 'true')
		res.header('Access-Control-Allow-Origin', '*')
		res.header(
			'Access-Control-Allow-Methods',
			'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
		)
		res.header(
			'Access-Control-Allow-Headers',
			'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Set-Cookie'
		)
		next()
	})

	app.use(
		session({
			store: new RedisStore({ client: redis.client, disableTouch: true }),
			secret: process.env.COOKIE_SECRET as string,
			resave: false,
			saveUninitialized: true,
			cookie: {
				secure: process.env.TS_NODE_DEV ? false : true,
				maxAge: 60 * 60 * 1000,
				httpOnly: true,
			},

			name: 'auth.cookie',
		})
	)
	app.use((req, res, next) => {
		RequestContext.create(DI.orm.em, next)
	})

	app.disable('x-powered-by')
	process.env.TS_NODE_DEV ?? app.use(helmet())

	setupRoutes(app)
	app.use((req, res) =>
		res.status(404).json({ Error: `Route ${req.url} not found.` })
	)
}

init().then(
	() =>
		(DI.server = app.listen(port, () => {
			console.info(`Express server listening on ${port}...`)
		}))
)
