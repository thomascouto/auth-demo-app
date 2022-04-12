import React from "react"
import "./index.css"
import { createRoot } from "react-dom/client"
import { Routes, Route } from "react-router"
import { BrowserRouter } from "react-router-dom"
import App from "./App"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)

root.render(
	<BrowserRouter>
		<Routes>
			<Route path="/*" element={<App />} />
		</Routes>
	</BrowserRouter>
)
