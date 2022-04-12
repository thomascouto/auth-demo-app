import { Express } from 'express'
import {
	cookieP,
	jsonParser,
	url,
	appCors,
	requestContext,
} from '@/middlewares'
import helmet from 'helmet'
import logger from 'morgan'
import { setupRedis } from './setupRedis'
import { appSession } from '@/middlewares/session'

export default async (app: Express): Promise<void> => {
	app.use(cookieP)
	app.use(jsonParser)
	app.use(url)
	app.use(appSession(await setupRedis()))

	if (process.env.TS_NODE_DEV) {
		app.use(logger('common'))
		app.use(appCors)
	} else app.use(helmet())

	app.use(requestContext)
}
