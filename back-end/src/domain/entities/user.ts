import { Entity, Property, TextType } from '@mikro-orm/core'
import { AbstractBaseEntity } from './abstractBaseEntity'

type UserProps = {
	username: string
	password: string
	isAdmin: boolean
	refreshToken?: string
}

@Entity()
export class User extends AbstractBaseEntity {
	@Property({ nullable: false, unique: true })
	username!: string

	@Property({ nullable: false })
	password!: string

	@Property({ default: false })
	isAdmin!: boolean

	@Property({ type: TextType, nullable: true })
	refreshToken!: string

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
