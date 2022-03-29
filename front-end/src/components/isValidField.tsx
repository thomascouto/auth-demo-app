import React, { Component, ReactNode } from "react"

export class CharCounter extends Component<{
	isUserValid: boolean
	isPassValid: boolean
}> {
	private fail = "⛔️"
	private pass = "✅"

	render(): ReactNode {
		return (
			<div className="box">
				<span>Username: {this.props.isUserValid ? this.pass : this.fail}</span>
				<span>Password: {this.props.isPassValid ? this.pass : this.fail}</span>
			</div>
		)
	}
}
