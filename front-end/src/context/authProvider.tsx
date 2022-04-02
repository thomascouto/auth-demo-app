import React, { createContext, useState, FC } from "react"
import { LoginServerData } from "../api/loginServerData"

const useValue = () => {
	const [auth, setAuth] = useState<LoginServerData>()
	return {
		auth,
		setAuth,
	}
}

const AuthContext = createContext({} as ReturnType<typeof useValue>)
export const AuthProvider: FC = ({ children }) => {
	return (
		<AuthContext.Provider value={useValue()}>{children}</AuthContext.Provider>
	)
}

export default AuthContext
