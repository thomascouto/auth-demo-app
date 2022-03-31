import { refreshToken } from '@/controller/tokenController'
import { Router } from 'express'

export default (router: Router): void => {
	router.post('/refreshtoken', refreshToken)
}
