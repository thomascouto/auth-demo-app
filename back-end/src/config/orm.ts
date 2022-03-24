import { Options } from '@mikro-orm/core'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'

const options: Options = {
	type: 'postgresql',
	entities: ['./dist/domain/entities/**'],
	entitiesTs: ['./src/domain/entities/**'],
	dbName: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: Number(process.env.DB_PORT),
	debug: true,
	metadataProvider: TsMorphMetadataProvider,
}

export default Promise.resolve(options)
