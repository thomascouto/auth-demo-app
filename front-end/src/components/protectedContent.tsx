import React, { Component } from "react"

interface AbstractComponentProps {
	username: string
}

interface AbstractComponentState {
	name: string
}

abstract class AbstractComponent extends Component<
	AbstractComponentProps,
	AbstractComponentState
> {
	state = { name: "joao" }
}

export default AbstractComponent
