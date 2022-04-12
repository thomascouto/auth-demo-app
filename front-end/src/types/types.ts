import { Location } from "react-router"

export type UserDataType = {
	id?: number
	username?: string
	isAdmin?: boolean
}

export type GlobalStateType = {
	userData: UserDataType
	setUserData: React.Dispatch<React.SetStateAction<UserDataType>>
	isLoggedIn: boolean
	setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
	sessionID: string
	setSessionID: React.Dispatch<React.SetStateAction<string>>
}

export type AxiosPostResponse = {
	id: number
	username: string
	isAdmin: boolean
	session: string
}

export type LocationProps = {
	state: {
		from: Location
	}
}

export type PrivateRouteProps = {
	adminRule: boolean
}
