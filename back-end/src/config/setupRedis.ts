import { RedisClientType, RedisClientOptions, createClient } from 'redis'

const redis = {} as {
	client: RedisClientType
}

const redisOptions: RedisClientOptions = {
	password: process.env.REDIS_PASS,
	legacyMode: true,
}

const setupRedis = async (): Promise<void> => {
	const client = createClient(redisOptions)
	client.on('error', (err) =>
		console.log('Redis Client Error: ', (err as Error).message)
	)
	client.on('connect', function () {
		console.log('Redis server connected...')
	})
	await client.connect()
	redis.client = client
}

export { setupRedis, redis }
