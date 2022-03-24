import { Factory, Faker } from '@mikro-orm/seeder'
import { User } from 'domain/entities/user'

export class UserFactory extends Factory<User> {
	model = User

	definition(faker: Faker): Partial<User> {
		return {
			username: faker.internet.userName(),
			password: faker.internet.password(),
			isAdmin: faker.datatype.boolean(),
		}
	}
}
