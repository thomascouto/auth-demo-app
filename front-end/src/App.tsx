import React from "react"
import { Routes, Route } from "react-router"
import NotFound from "./components/404"
import Admin from "./components/Admin"
import Layout from "./components/Layout"
import Login from "./components/Login"
import Main from "./components/Main"
import PrivateRoute from "./components/PrivateRoute"
import GlobalStateContext from "./context/globalStateContext"
import useGlobalState from "./hooks/useGlobalState"

const App = () => {
	const globalState = useGlobalState()

	return (
		<GlobalStateContext.Provider value={globalState}>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="login" element={<Login />} />

					<Route element={<PrivateRoute adminRule={true} />}>
						<Route path="admin" element={<Admin />} />
					</Route>

					<Route element={<PrivateRoute adminRule={false} />}>
						<Route path="/" element={<Main />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</GlobalStateContext.Provider>
	)
}

export default App
