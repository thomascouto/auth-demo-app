import { DI } from '@/server'
import { MikroORM } from '@mikro-orm/core'
import { EntityManager } from '@mikro-orm/postgresql'

export const setupOrm = async () => {
	DI.orm = await MikroORM.init()
	DI.em = DI.orm.em as EntityManager
	await DI.orm
		.isConnected()
		.then(() => {
			console.info('DB status: Connected...')
		})
		.catch((err) => {
			console.info('DB not connected. Exiting...', err)
			process.exit(1)
		})
}
