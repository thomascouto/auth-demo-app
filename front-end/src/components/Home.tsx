import React from "react"
import useAuth from "../hooks/useAuth"

const Home = () => {
	const { auth } = useAuth()
	return <div>Hello {auth?.username}</div>
}

export default Home
