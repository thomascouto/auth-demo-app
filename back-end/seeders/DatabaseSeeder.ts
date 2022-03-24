import type { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { UserFactory } from './userFactory'

export class DatabaseSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		new UserFactory(em).make(5)
	}
}
