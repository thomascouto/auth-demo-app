declare namespace Express {
	interface Request {
		user: UserRequest
	}
}

type UserRequest = {
	username: string
	isAdmin: boolean
}
