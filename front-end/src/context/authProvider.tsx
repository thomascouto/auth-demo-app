import React, { createContext, useState, FC } from "react"
import { LoginServerData } from "../interface/loginServerData"

type props = {
	children: JSX.Element
}

const useValue = () => {
	const [auth, setAuth] = useState<LoginServerData>()
	return {
		auth,
		setAuth,
	}
}

const AuthContext = createContext({} as ReturnType<typeof useValue>)
export const AuthProvider = ({ children }: props) => {
	return (
		<AuthContext.Provider value={useValue()}>{children}</AuthContext.Provider>
	)
}

export default AuthContext
