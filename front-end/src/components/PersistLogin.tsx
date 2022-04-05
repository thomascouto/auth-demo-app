import React from "react"
import { Outlet } from "react-router"
import { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import useRefresh from "../hooks/useRefresh"

const PersistLogin = () => {
	const { auth } = useAuth()
	const refresh = useRefresh()

	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				await refresh()
			} catch (err) {
				console.error(err)
			}
		}

		verifyRefreshToken()
	}, [])

	console.log("Hello from persistance", auth)
	return <Outlet />
}

export default PersistLogin
