import { signin, signout, signup } from '@/controller/userController'
import { Router, Request, Response } from 'express'
import authJwt from '@/middlewares/jwtAuthMiddleware'

export default (router: Router): void => {
	router.get('/', (req: Request, res: Response) => {
		res.redirect('/headers')
	})

	router.get('/headers', (req: Request, res: Response) => {
		res.json(req.headers).end()
	})

	router.get('/user', authJwt.verifyToken, (req: Request, res: Response) => {
		res.json({ hello: 'world' }).end()
	})

	router.get(
		'/admin',
		[authJwt.verifyToken, authJwt.verifyRules],
		(req: Request, res: Response) => {
			res.json({ hello: 'world' }).end()
		}
	)

	router.post('/signup', signup)
	router.post('/signin', signin)
	router.post('/signout', signout)
}
