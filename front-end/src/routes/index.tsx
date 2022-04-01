import React, { FunctionComponent } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NotFound from "../components/404"
import AppForm from "../components/form"
import Layout from "../components/layout"
import Protected from "../components/protected"

const AppRoutes: FunctionComponent = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="protected" element={<Protected />} />
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	)
}

export default AppRoutes
