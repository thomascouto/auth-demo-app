import cors from 'cors'

// export const cors = (req: Request, res: Response, next: NextFunction) => {
// 	if (process.env.TS_NODE_DEV) {
// 		res.set('access-control-allow-origin', '*')
// 		res.set('access-control-allow-headers', '*')
// 		res.set('access-control-allow-methods', '*')
// 	}
// 	next()
// }

export const appCors = cors({
	origin: ['http://localhost:3001'],
	credentials: true,
})
