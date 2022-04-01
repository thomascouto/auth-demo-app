import React, { StrictMode } from "react"
import { render } from "react-dom"
import { App } from "./App"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css"
import { AuthProvider } from "./context/authProvider"

const root = document.getElementById("root")
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
	root
)
