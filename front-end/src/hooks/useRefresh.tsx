import axios from "../api/axios"

const useRefresh = () => {
	const refresh = async () => {
		try {
			await axios.get("/refresh", { withCredentials: true })
		} catch (error) {
			console.error(error)
		}
	}
	return refresh
}

export default useRefresh
