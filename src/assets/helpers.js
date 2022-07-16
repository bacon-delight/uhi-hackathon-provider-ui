export function mapStatus(status) {
	switch (status) {
		case "pending":
			return "Pending";
		case "responded":
			return "Responded";
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
		case "responded":
			return "information";
		case "sos":
			return "critical";
		case "confirmed":
			return "success";
		default:
			return false;
	}
}
