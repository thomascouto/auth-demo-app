import React, { useContext } from "react"
import GlobalStateContext from "../context/globalStateContext"

export default function Admin() {
	const globalState = useContext(GlobalStateContext)
	return (
		<div>
			<div>Admin Dashboard {JSON.stringify(globalState?.userData)}</div>
			<div>Session Status: {JSON.stringify(globalState?.isLoggedIn)}</div>
		</div>
	)
}
