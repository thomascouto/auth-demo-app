import React, { SyntheticEvent, useContext, useEffect, useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router"
import GlobalStateContext from "../context/globalStateContext"
import useForm from "../hooks/useForm"
import axios from "../api/axios"
import { AxiosPostResponse, LocationProps } from "../types/types"

export default function Login() {
	const [isLoading, setIsLoading] = useState(false)
	// const navigate = useNavigate()
	const location = useLocation() as unknown as LocationProps
	const from = location.state?.from?.pathname || "/"
	const globalState = useContext(GlobalStateContext)
	const {
		username,
		setUsername,
		password,
		setPassword,
		// isInputError,
		setIsInputError,
		// inputErrorMessage,
		// setInputErrorMessage,
	} = useForm()

	useEffect(() => {
		console.log(globalState?.isLoggedIn)
	}, [globalState])

	const handleLogin = (e: SyntheticEvent) => {
		e.preventDefault()

		const doPost = async () => {
			try {
				setIsLoading(true)
				const { data, status } = await axios.post<AxiosPostResponse>(
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
				console.log(error)
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
								setIsInputError(false)
								setUsername(e.target.value)
							}}
						/>
						<div className="password-container">
							<input
								className="password"
								type="password"
								placeholder="password"
								value={password}
								onChange={(e) => {
									setIsInputError(false)
									setPassword(e.target.value)
								}}
							/>
						</div>

						<button type="submit" onClick={handleLogin}>
							Login
						</button>
					</form>
				</div>
			)}
		</>
	)
}
