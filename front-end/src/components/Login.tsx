import React, { SyntheticEvent, useState } from "react"
import "../App.css"
import axios from "../api/axios"
import { LoginServerData } from "../interface/loginServerData"
import useAuth from "../hooks/useAuth"
import { useLocation, useNavigate } from "react-router"

type LocationProps = {
	state: {
		from: Location
	}
}

const Login = () => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const { setAuth } = useAuth()
	const navigate = useNavigate()
	const location = useLocation() as unknown as LocationProps
	const SIMPLE_REGEX = /^[\w]{5,15}$/

	const handleSubmit = async (e: SyntheticEvent) => {
		e.preventDefault()

		if (username.match(SIMPLE_REGEX) && password.match(SIMPLE_REGEX)) {
			try {
				const response = await axios.post<LoginServerData>(
					"login",
					{
						username,
						password,
					},
					{ withCredentials: true }
				)

				setAuth({
					id: response.data.id,
					username: response.data.username,
					isAdmin: response.data.isAdmin,
				})
				const from = location.state?.from?.pathname || "/"
				navigate(from, { replace: true })
			} catch (error) {
				console.error((error as Error).message)
			} finally {
				console.info("request end.")
			}
		}
	}

	return (
		<div>
			<form method="post">
				<div className="inputbox">
					<input
						autoComplete="off"
						placeholder="Username"
						type="text"
						defaultValue={username}
						name="username"
						onChange={(e) => setUsername(e.target.value.trim())}
						required
					/>
				</div>
				<div className="inputbox">
					<input
						placeholder="Password"
						autoComplete="off"
						type="password"
						defaultValue={password}
						name="password"
						onChange={(e) => setPassword(e.target.value.trim())}
						required
					/>
				</div>
				<div className="inputbox">
					<button onClick={handleSubmit}>Submit</button>
					<button>Register</button>
				</div>
			</form>
		</div>
	)
}

export default Login
