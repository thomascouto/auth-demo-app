import './config/moduleAlias'
import 'dotenv/config'
import express from 'express'
import http from 'http'
import { setupRoutes } from './config/setupRoutes'
import { setupRedis } from './config/setupRedis'
import { MikroORM, RequestContext } from '@mikro-orm/core'
import { EntityManager } from '@mikro-orm/postgresql'

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

	app.use(express.json())
	app.use(express.urlencoded({ extended: true }))
	app.use((req, res, next) => {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		)
		next()
	})
	app.use((req, res, next) => {
		RequestContext.create(DI.orm.em, next)
	})

	setupRoutes(app)
	await setupRedis()
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
