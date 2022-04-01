import React, { ChangeEvent, SyntheticEvent, useContext, useState } from "react"
import {
	Button,
	Form,
	Container,
	ButtonGroup,
	ButtonToolbar,
	FloatingLabel,
} from "react-bootstrap"
import { CharCounter } from "./isValidField"
import { LoginServerData } from "../api/loginServerData"
import axios from "../api/axios"
import AlertMessage from "./alertMessage"
import AuthContext from "../context/authProvider"

export default function AppForm() {
	const [userRules, setUserRules] = useState(false)
	const [passRules, setPassRules] = useState(false)
	const [isAlertShown, setIsAlertShown] = useState(false)
	const [serverResponse, setServerResponse] = useState<string>()
	const [statusCode, setStatusCode] = useState<number>(0)
	const [username, setUsername] = useState<string>()
	const [password, setPassword] = useState<string>()
	const { setAuth } = useContext(AuthContext)

	const SIMPLE_REGEX = /^[\w\d]{5,15}$/

	const validation = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim()
		const pass = value && value.match(SIMPLE_REGEX) ? true : false

		if (e.target.id === "floatingUsername") {
			setUserRules(pass)
			setUsername(e.target.value)
			return
		}

		setPassRules(pass)
		setPassword(e.target.value)
	}

	const submitForm = async (e: SyntheticEvent) => {
		e.preventDefault()
		try {
			const response = await axios.post<LoginServerData>(
				"signin",
				{
					username,
					password,
				},
				{ withCredentials: true }
			)

			setAuth({})
			setStatusCode(response.status)
			setServerResponse("Success, redirecting...")
			return false
		} catch (error: unknown) {
			setServerResponse((error as Error).message)
			setStatusCode(403)
		} finally {
			setIsAlertShown(true)
		}
	}

	return (
		<Container className="w-25 p-3">
			<Form onSubmit={submitForm}>
				<FloatingLabel
					controlId="floatingUsername"
					label="Username"
					className="mb-2"
				>
					<Form.Control
						type="text"
						placeholder="Username"
						onChange={validation}
						autoComplete="off"
						required
					/>
				</FloatingLabel>
				<FloatingLabel controlId="floatingPassword" label="Password">
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={validation}
						autoComplete="off"
						required
					/>
				</FloatingLabel>
				<CharCounter isUserValid={userRules} isPassValid={passRules} />
				<ButtonToolbar className="pt-2 justify-content-center">
					<ButtonGroup className="me-2">
						<Button disabled={!userRules || !passRules}>Login</Button>
					</ButtonGroup>
					<ButtonGroup>
						<Button href="/register">Not registered ?</Button>
					</ButtonGroup>
				</ButtonToolbar>
			</Form>
			<AlertMessage
				isAlertShown={isAlertShown}
				statusCode={statusCode}
				serverResponse={serverResponse}
			/>
		</Container>
	)
}
