import axios, { AxiosRequestConfig } from "axios"

const baseURL = "http://localhost:3000"
const timeout = 1000
const headers = { "Content-Type": "application/json" }
const config = {
	baseURL,
	timeout,
	headers,
} as AxiosRequestConfig

export default axios.create(config)
