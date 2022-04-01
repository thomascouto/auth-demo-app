import React, { FunctionComponent } from "react"
import { Outlet } from "react-router-dom"
import "../App.css"

const Layout: FunctionComponent = () => {
	return (
		<main className="App-header">
			<Outlet />
		</main>
	)
}

export default Layout
