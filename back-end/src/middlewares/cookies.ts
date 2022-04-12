import cookieParser from 'cookie-parser'

export const cookieP = cookieParser(process.env.COOKIE_SECRET)
