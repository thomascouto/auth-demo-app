import { HttpResponse } from '@/interface/httpResponse'

export const ok = (body?: unknown): HttpResponse => response(200, body)
export const created = (body?: unknown): HttpResponse => response(201, body)
export const noContent = (): HttpResponse => response(204)
export const forbidden = (body?: unknown): HttpResponse => response(401, body)

const response = (statusCode: number, body?: unknown): HttpResponse => ({
	statusCode,
	body,
})
