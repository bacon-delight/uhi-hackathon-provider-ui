export function mapStatus(status) {
	switch (status) {
		case "pending":
			return "Pending";
		case "initiated":
			return "Initiated";
		case "sos":
			return "SOS";
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
		case "sos":
			return "critical";
		case "confirmed":
			return "success";
		default:
			return false;
	}
}
