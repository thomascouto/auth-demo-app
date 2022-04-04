import { Entity, Property } from '@mikro-orm/core'
import { AbstractBaseEntity } from './abstractBaseEntity'

type UserProps = {
	username: string
	password: string
	isAdmin: boolean
}

@Entity()
export class User extends AbstractBaseEntity {
	@Property({ nullable: false, unique: true })
	username!: string

	@Property({ nullable: false })
	password!: string

	@Property({ default: false })
	isAdmin!: boolean

	set props({ username, password, isAdmin }: UserProps) {
		this.username = username
		this.password = password
		this.isAdmin = isAdmin
	}

	constructor(props?: UserProps) {
		super()
		if (props) this.props = props
	}
}
