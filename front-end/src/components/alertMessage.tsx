import React, { FunctionComponent } from "react"
import { Alert } from "react-bootstrap"

interface AlertMessageProps {
	isAlertShown: boolean
	isError: boolean
	validationResponse?: string
}

const alertType = (isError: boolean): string => {
	return isError ? "danger" : "success"
}

const AlertMessage: FunctionComponent<AlertMessageProps> = ({
	isAlertShown,
	validationResponse,
	isError,
}: AlertMessageProps) => {
	return (
		<Alert
			className="pt-3 mt-3"
			variant={alertType(isError)}
			show={isAlertShown}
		>
			<span>{validationResponse}</span>
		</Alert>
	)
}
export default AlertMessage
