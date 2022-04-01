import React, { FunctionComponent } from "react"
import { Alert } from "react-bootstrap"

interface AlertMessageProps {
	isAlertShown: boolean
	statusCode: number
	serverResponse?: string
}

const alertType = (statusCode: number): string => {
	return statusCode > 400 ? "danger" : "success"
}

const AlertMessage: FunctionComponent<AlertMessageProps> = ({
	isAlertShown,
	serverResponse,
	statusCode,
}: AlertMessageProps) => {
	return (
		<Alert
			className="pt-3 mt-3"
			variant={alertType(statusCode)}
			show={isAlertShown}
		>
			<span>{serverResponse}</span>
		</Alert>
	)
}
export default AlertMessage
