import React, { useState } from "react"
import { GlobalStateType, UserDataType } from "../types/types"

export default function useGlobalState(): GlobalStateType {
	const [userData, setUserData] = useState<UserDataType>({})
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [sessionID, setSessionID] = useState("")

	return {
		userData,
		setUserData,
		isLoggedIn,
		setIsLoggedIn,
		sessionID,
		setSessionID,
	}
}
