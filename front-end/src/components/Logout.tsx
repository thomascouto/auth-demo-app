import React, { SyntheticEvent, useContext } from "react"
import { Navigate, useLocation } from "react-router"
import axios from "../api/axios"
import GlobalStateContext from "../context/globalStateContext"
import { LocationProps } from "../types/types"

const Logout = () => {
	const globalState = useContext(GlobalStateContext)
	const location = useLocation() as unknown as LocationProps
	const handleClick = (e: SyntheticEvent) => {
		e.preventDefault()

		const doLogout = async () => {
			try {
				const response = await axios.post(
					"logout",
					{},
					{ withCredentials: true }
				)
				if (response.status === 200) {
					globalState?.setIsLoggedIn(false)
					globalState?.setSessionID("")
					globalState?.setUserData({})
				}
			} catch (error) {
				console.log(error)
			}
		}

		if (window.sessionStorage.getItem("SESSION")) {
			window.sessionStorage.removeItem("SESSION")
			doLogout()
		}
	}

	return (
		<>
			{!globalState?.isLoggedIn ? (
				<Navigate to="/login" state={{ from: location }} replace />
			) : (
				<div>
					<form>
						<button onClick={handleClick}>Logout</button>
					</form>
				</div>
			)}
		</>
	)
}

export default Logout
