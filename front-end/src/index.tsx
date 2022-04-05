import React, { StrictMode } from "react"
import { render } from "react-dom"
import { AuthProvider } from "./context/authProvider"
import "./index.css"
import App from "./App"
import { Routes, Route } from "react-router"
import { BrowserRouter } from "react-router-dom"

render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/*" element={<App />} />
				</Routes>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>,
	document.getElementById("root")
)

