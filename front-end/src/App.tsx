import React, { Component, ReactNode } from "react"
import { Routes, Route } from "react-router-dom"
import "./App.css"
import NotFound from "./components/404"
import AppForm from "./components/form"
import Layout from "./components/layout"
export class App extends Component {
	render(): ReactNode {
		return (
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="login" element={<AppForm />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		)
	}
}
