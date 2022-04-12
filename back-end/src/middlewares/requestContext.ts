import { DI } from '@/server'
import { RequestContext } from '@mikro-orm/core'
import { NextFunction, Request, Response } from 'express'

export const requestContext = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	RequestContext.create(DI.orm.em, next)
}
