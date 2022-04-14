import React, { SyntheticEvent, useContext, useState } from "react"
import { Navigate, useLocation } from "react-router"
import GlobalStateContext from "../context/globalStateContext"
import useForm from "../hooks/useForm"
import axios from "../api/axios"
import { AxiosPostResponse, LocationProps } from "../types/types"

export default function Login() {
	const [isLoading, setIsLoading] = useState(false)
	const location = useLocation() as unknown as LocationProps
	const globalState = useContext(GlobalStateContext)
	const {
		username,
		setUsername,
		password,
		setPassword,
		inputErrorMessage,
		setInputErrorMessage,
	} = useForm()

	const handleLogin = (e: SyntheticEvent) => {
		e.preventDefault()
		setInputErrorMessage("")

		const doPost = async () => {
			try {
				setIsLoading(true)
				const { data, status, statusText } =
					await axios.post<AxiosPostResponse>(
						"login",
						{ username, password },
						{ withCredentials: true }
					)
				if (status === 200) {
					const { id, username, isAdmin, session } = data
					window.sessionStorage.setItem("SESSION", data.session)
					globalState?.setIsLoggedIn(true)
					globalState?.setUserData({ id, username, isAdmin })
					globalState?.setSessionID(session)
					console.log(data)
				}
			} catch (error) {
				setInputErrorMessage((error as Error).message)
			} finally {
				setIsLoading(false)
			}
		}

		doPost()
	}

	return (
		<>
			{isLoading ? (
				<p>Loading login data...</p>
			) : globalState?.isLoggedIn ? (
				<Navigate to="/" state={{ from: location }} replace />
			) : (
				<div className="form-container">
					<form className="relative">
						<h2>Login form</h2>
						<input
							type="text"
							placeholder="username"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value)
							}}
							required
						/>
						<div className="password-container">
							<input
								className="password"
								type="password"
								placeholder="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value)
								}}
								required
							/>
						</div>

						<button type="submit" onClick={handleLogin}>
							Login
						</button>
					</form>
					{inputErrorMessage !== "" ? <p>Error: {inputErrorMessage} </p> : ""}
				</div>
			)}
		</>
	)
}
