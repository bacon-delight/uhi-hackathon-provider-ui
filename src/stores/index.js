import { defineStore } from "pinia";

export const store = defineStore({
	id: "counter",
	state: () => ({
		selectedCategory: "current",
		selectedPatient: null,
		current: [
			{
				id: "120833398",
				name: "Shiwani Rawat",
				status: "pending",
				timestamp:
					"Fri Jul 15 2022 23:12:18 GMT+0530 (India Standard Time)",
			},
			{
				id: "389479818",
				name: "Satyam Kumar",
				status: "pending",
				timestamp:
					"Fri Jul 15 2022 23:12:18 GMT+0530 (India Standard Time)",
			},
			{
				id: "427483398",
				name: "Shivam Singh",
				status: "responded",
				timestamp:
					"Fri Jul 15 2022 23:12:18 GMT+0530 (India Standard Time)",
			},
		],
		confirmed: [
			{
				id: "120833398",
				name: "Shiwani Rawat",
				status: "confirmed",
				timestamp:
					"Fri Jul 15 2022 23:12:18 GMT+0530 (India Standard Time)",
			},
		],
		dispatched: [],
	}),
	getters: {
		getCards(state) {
			switch (state.selectedCategory) {
				case "current":
					return state.current;
				case "confirmed":
					return state.confirmed;
				case "dispatched":
					return state.dispatched;
				default:
					break;
			}
		},
		getPatient(state) {
			if (state.selectedPatient === null) {
				return false;
			}
			switch (state.selectedCategory) {
				case "current":
					return state.current[this.selectedPatient];
				case "confirmed":
					return state.confirmed[this.selectedPatient];
				case "dispatched":
					return state.dispatched[this.selectedPatient];
				default:
					break;
			}
		},
	},
	actions: {
		selectCategory(category) {
			this.selectedCategory = category;
			this.selectedPatient = null;
		},
		selectPatient(index) {
			this.selectedPatient = index;
		},
	},
});
