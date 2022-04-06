declare namespace Express {
	interface Request {
		user: UserRequest
		isAuthenticated: boolean
	}
}

type UserRequest = {
	username: string
	isAdmin: boolean
}
