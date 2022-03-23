import { Entity, Property } from '@mikro-orm/core'
import { AbstractBaseEntity } from './abstractBaseEntity'

type UserProps = {
	username: string
	password: string
}

@Entity()
export class User extends AbstractBaseEntity {
	@Property({ nullable: false })
	username!: string

	@Property({ nullable: false })
	password!: string

	set props({ username, password }: UserProps) {
		this.username = username
		this.password = password
	}

	constructor(props?: UserProps) {
		super()
		if (props) this.props = props
	}
}
