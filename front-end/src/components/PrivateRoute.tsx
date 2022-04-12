import React, { useContext, useEffect, useState } from "react"
import GlobalStateContext from "../context/globalStateContext"
import { Navigate, useLocation, Outlet } from "react-router-dom"
import axios from "../api/axios"
import { GlobalStateType, PrivateRouteProps } from "../types/types"

const PrivateRoute: React.FC<{ adminRule: boolean }> = ({
	adminRule,
}: PrivateRouteProps) => {
	const [isLoading, setIsLoading] = useState(true)
	const globalState = useContext(GlobalStateContext) as GlobalStateType
	const location = useLocation()

	useEffect(() => {
		let isMounted = true

		async function doRefresh() {
			try {
				const response = await axios.get("refresh", { withCredentials: true })
				if (response.status === 200) {
					const { username, session, id, isAdmin } = response.data
					if (username && session) {
						globalState.setSessionID(session)
						globalState.setUserData({ username, id, isAdmin })
						globalState.setIsLoggedIn(true)
						window.sessionStorage.setItem("SESSION", session)
					}
					return
				}
				window.sessionStorage.removeItem("SESSION")
			} catch (error) {
				console.error(error)
			} finally {
				isMounted && setIsLoading(false)
			}
		}

		const session = window.sessionStorage.getItem("SESSION")
		session && !globalState.sessionID ? doRefresh() : setIsLoading(false)

		return () => {
			isMounted = false
		}
	}, [])

	return (
		<>
			{isLoading ? (
				<p>Loading...</p>
			) : globalState.sessionID ? (
				globalState.userData.isAdmin ||
				adminRule === globalState.userData.isAdmin ? (
					<Outlet />
				) : (
					<p>Not authorized</p>
				)
			) : (
				<Navigate to="/login" state={{ from: location }} replace />
			)}
		</>
	)
}

export default PrivateRoute
