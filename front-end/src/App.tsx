import React from "react"
import { Routes, Route } from "react-router-dom"
import "./App.css"
import NotFound from "./components/404"
import Layout from "./components/Layout"
import Login from "./components/Login"
import Protected from "./components/Protected"
import RequireAuth from "./components/RequireAuth"

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="login" element={<Login />} />

				<Route element={<RequireAuth />}>
					<Route path="protected" element={Protected} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App
