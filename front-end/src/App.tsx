import React, { Component } from "react"
import "./App.css"
import FormComponent from "./form/formComponent"

export class App extends Component {
	render(): React.ReactNode {
		return (
			<div className="App">
				<header className="App-header">
					<FormComponent />
				</header>
			</div>
		)
	}
}
