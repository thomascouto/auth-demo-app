import React from "react"
import { Routes, Route } from "react-router-dom"
import "./App.css"
import NotFound from "./components/404"
import Home from "./components/Home"
import Layout from "./components/Layout"
import Login from "./components/Login"
import RequireAuth from "./components/RequireAuth"
import PersistLogin from "./components/PersistLogin"

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route path="login" element={<Login />} />

				<Route element={<PersistLogin />}>
					<Route element={<RequireAuth />}>
						<Route path="/" element={<Home />} />
					</Route>
				</Route>

				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App

