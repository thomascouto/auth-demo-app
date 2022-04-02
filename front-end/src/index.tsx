import React, { StrictMode } from "react"
import { render } from "react-dom"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/authProvider"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import App from "./App"

render(
	<StrictMode>
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/*" element={<App />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	</StrictMode>,
	document.getElementById("root")
)
