import React from "react"
import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const RequireAuth = () => {
	const { auth } = useAuth()
	const location = useLocation()

	if (auth && auth.username) return <Outlet />
	return <Navigate to="/login" state={{ from: location }} replace />
}

export default RequireAuth
