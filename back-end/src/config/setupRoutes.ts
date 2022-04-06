import { Router, Express } from 'express'
import { readdirSync, existsSync } from 'fs'
import { join } from 'path'

const BASE_DIR = join(__dirname, '../routes')
export const setupRoutes = (app: Express): void => {
	const router = Router()
	try {
		if (existsSync(BASE_DIR)) {
			recursiveReading(BASE_DIR, router)
			app.use('/', router)
		} else throw new Error()
	} catch (err) {
		console.error('Routes directory not found, exiting...', BASE_DIR)
		process.exit(1)
	}
}

const recursiveReading = (dir: string, router: Router): void => {
	readdirSync(dir, { withFileTypes: true }).forEach(async (element) => {
		if (element.isFile()) {
			;(await import(`${dir}/${element.name}`)).default(router)
		} else if (element.isDirectory()) {
			recursiveReading(join(dir, element.name), router)
		}
	})
}
