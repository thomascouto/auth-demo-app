import React, { useState } from "react"
import {
	Button,
	Form,
	Container,
	ButtonGroup,
	ButtonToolbar,
	FloatingLabel,
} from "react-bootstrap"
import { CharCounter } from "./charCounter"

function FormComponent() {
	const [userRules, setUserRules] = useState(false)
	const [passRules, setPassRules] = useState(false)

	const validation = (e: React.ChangeEvent<HTMLInputElement>) => {
		const pass = e.target.value.trim().length >= 5 ? true : false
		if (e.target.id === "floatingUsername") {
			setUserRules(pass)
			return
		}
		setPassRules(pass)
	}

	return (
		<Container className="w-25 p-3">
			<Form method="post">
				<FloatingLabel
					controlId="floatingUsername"
					label="Username"
					className="mb-2"
				>
					<Form.Control
						type="text"
						placeholder="Username"
						onChange={validation}
					/>
				</FloatingLabel>
				<FloatingLabel controlId="floatingPassword" label="Password">
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={validation}
					/>
				</FloatingLabel>
				<CharCounter isUserValid={userRules} isPassValid={passRules} />
				<ButtonToolbar className="pt-2 justify-content-center">
					<ButtonGroup className="me-2">
						<Button type="submit" disabled={!userRules || !passRules}>
							Login
						</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button>Register</Button>
					</ButtonGroup>
				</ButtonToolbar>
			</Form>
		</Container>
	)
}

export default FormComponent
