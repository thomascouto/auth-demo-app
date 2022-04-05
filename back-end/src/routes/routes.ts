import { Request, Response, Router } from 'express'
import { login, logout, signup, refresh } from '@/controller/userController'

export default (router: Router): void => {
	router.get('/', (req: Request, res: Response) => {
		res.json(req.headers).end()
	})

	router.post('/login', login)
	router.post('/signup', signup)
	router.post('/logout', logout)
	router.get('/refresh', refresh)
}
