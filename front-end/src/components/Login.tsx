import React, { useState } from "react"
import {
	Button,
	Form,
	Container,
	ButtonGroup,
	ButtonToolbar,
	FloatingLabel,
} from "react-bootstrap"

// import { LoginServerData } from "../api/loginServerData"
// import { useNavigate } from "react-router-dom"
// import AlertMessage from "./AlertMessage"
// import axios from "../api/axios"
// import useAuth from "../hooks/useAuth"

// const Login = () => {
// 	const [isValid, setIsValid] = useState(false)
// 	const [validationResponse, setValidationResponse] = useState<string>()
// 	const [statusCode, setStatusCode] = useState(0)
// 	const { setAuth } = useAuth()
// 	const navigate = useNavigate()
// 	const SIMPLE_REGEX = /^[\w]{5,15}$/

// 	const checkForm = () => {
// 		if (username?.match(SIMPLE_REGEX) && password?.match(SIMPLE_REGEX))
// 			return true
// 		return false
// 	}

// 	const submitForm = async (e: SyntheticEvent) => {
// 		e.preventDefault()
// 		console.log("submitted")
// 		if (checkForm()) {
// 			console.log("true")
// 		}
// 		console.log(false)

// 		// if (isValid) {
// 		// 	try {
// 		// 		const response = await axios.post<LoginServerData>(
// 		// 			"signin",
// 		// 			{
// 		// 				username,
// 		// 				password,
// 		// 			},
// 		// 			{ withCredentials: true }
// 		// 		)

// 		// 		setAuth(response.data)
// 		// 		setStatusCode(response.status)
// 		// 		setValidationResponse("Success, redirecting...")
// 		// 		navigate("/", { replace: true })
// 		// 	} catch (error: unknown) {
// 		// 		setValidationResponse((error as Error).message)
// 		// 		setStatusCode(403)
// 		// 	} finally {
// 		// 		// setUsername("")
// 		// 		// setPassword("")
// 		// 	}
// 		// }
// 	}

// type LoginProps<T> = {
// 	prop: T
// 	callback: (t: T) => void
// }

const Login = () => {
	const SIMPLE_REGEX = /^[\w]{5,15}$/
	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault()
		const target = e.target as typeof e.target & {
			username: { value: string }
			password: { value: string }
		}

		const username = target.username.value
		const password = target.password.value

		console.log(username, password)
	}
	return (
		<Container className="w-25 p-3">
			<Form onSubmit={handleSubmit}>
				<FloatingLabel label="Username" className="mb-2">
					<Form.Control
						type="text"
						name="username"
						placeholder="Username"
						autoComplete="off"
						required
					/>
				</FloatingLabel>
				<FloatingLabel /*id="password"*/ label="Password">
					<Form.Control
						type="password"
						name="password"
						placeholder="Password"
						autoComplete="off"
						required
					/>
				</FloatingLabel>
				<ButtonToolbar className="pt-2 justify-content-center">
					<ButtonGroup className="me-2">
						<Button type="submit">Login</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button href="/register">Not registered ?</Button>
					</ButtonGroup>
				</ButtonToolbar>
			</Form>
		</Container>
	)
}

export default Login
