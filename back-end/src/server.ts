import './config/moduleAlias'
import 'dotenv/config'
import express from 'express'
import { setupRoutes } from '@/config'
import { setupOrm } from './config/setupOrm'
import setupMiddlewares from './config/middlewares'
import { MikroORM } from '@mikro-orm/core'
import { EntityManager } from '@mikro-orm/postgresql'

export const DI = {} as {
	orm: MikroORM
	em: EntityManager
}

const port = process.env.SERVER_PORT ?? 3000
const app = express().set('trust proxy', 1).disable('x-powered-by')

const init = async () => {
	await setupOrm()
	await setupMiddlewares(app)
	setupRoutes(app)
}

init().then(() =>
	app.listen(port, () => {
		console.info(`Express server listening on ${port}...`)
	})
)
