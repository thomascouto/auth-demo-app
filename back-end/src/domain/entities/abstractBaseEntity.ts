import { DateType, PrimaryKey, Property } from '@mikro-orm/core'

export abstract class AbstractBaseEntity {
	@PrimaryKey({ autoincrement: true })
	id!: number

	@Property({ type: DateType, onCreate: () => new Date() })
	createdAt!: Date

	@Property({
		type: DateType,
		onCreate: () => new Date(),
		onUpdate: () => new Date(),
	})
	updatedAt!: Date

	abstract set props(v: unknown)
}
