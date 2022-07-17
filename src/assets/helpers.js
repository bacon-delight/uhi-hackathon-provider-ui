export function mapStatus(status) {
	switch (status) {
		case "pending":
			return "Pending";
		case "initiated":
			return "Initiated";
		case "dispatched":
			return "Dispatched";
		case "confirmed":
			return "Confirmed";
		default:
			return false;
	}
}

export function mapStatusHue(status) {
	switch (status) {
		case "pending":
			return "warning";
		case "initiated":
			return "information";
		case "dispatched":
			return "success";
		case "confirmed":
			return "success";
		default:
			return false;
	}
}
