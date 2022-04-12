import { RedisClientType, RedisClientOptions, createClient } from 'redis'

const redisOptions: RedisClientOptions = {
	password: process.env.REDIS_PASS,
	legacyMode: true,
}

const redis = {} as {
	client: RedisClientType
}
const setupRedis = async (): Promise<RedisClientType> => {
	const client = createClient(redisOptions)
	client.on('error', (err) =>
		console.log('Redis Client Error: ', (err as Error).message)
	)
	client.on('connect', function () {
		console.log('Redis server connected...')
	})
	await client.connect()
	redis.client = client
	return client
}

export { setupRedis, redis }
