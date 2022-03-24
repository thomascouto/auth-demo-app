import { RedisClientType } from '@node-redis/client'
import { createClient, RedisClientOptions } from 'redis'

const redis = {} as {
	client: RedisClientType
}

const redisOptions: RedisClientOptions = {
	password: process.env.REDIS_PASS,
}

const setupRedis = async (): Promise<RedisClientType> => {
	const client = createClient(redisOptions)
	client.on('error', (err) => console.log('Redis Client Error: ', err))
	client.on('connect', function () {
		console.log('Redis server connected...')
	})
	await client.connect()
	redis.client = client
	return client
}

export { setupRedis, redis }
