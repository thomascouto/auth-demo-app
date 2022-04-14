import React, { useState } from "react"

export default function useForm() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [inputErrorMessage, setInputErrorMessage] = useState("")

	return {
		username,
		setUsername,
		password,
		setPassword,
		inputErrorMessage,
		setInputErrorMessage,
	}
}
