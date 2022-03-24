import { User } from '@/domain/entities/user'
import { DI } from '@/server'
import { EntityRepository } from '@mikro-orm/postgresql'

export class UserRepository extends EntityRepository<User> {
	constructor() {
		super(DI.em, User)
	}
}
