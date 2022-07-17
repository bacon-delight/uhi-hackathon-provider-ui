import { defineStore } from "pinia";
import _ from "lodash";

export const store = defineStore({
	id: "counter",
	state: () => ({
		selectedCategory: "current",
		selectedPatient: null,
		currentLoaded: false,
		current: [],
		confirmed: [
			{
				id: "120833398",
				name: "Shiwani Rawat",
				status: "confirmed",
				timestamp:
					"Fri Jul 15 2022 23:12:18 GMT+0530 (India Standard Time)",
			},
		],
		transactions: [],
		dispatched: [],
	}),
	getters: {
		getCards(state) {
			switch (state.selectedCategory) {
				case "current":
					return _.filter(
						state.transactions,
						(patient) =>
							patient.status === "pending" ||
							patient.status === "initiated"
					);
				case "confirmed":
					return _.filter(
						state.transactions,
						(patient) => patient.status === "confirmed"
					);
				case "dispatched":
					return _.filter(
						state.transactions,
						(patient) => patient.status === "dispatched"
					);
				default:
					break;
			}
		},
		getPatient(state) {
			if (state.selectedPatient === null) {
				return false;
			}
			return _.find(state.transactions, { _id: this.selectedPatient });
			// return state.transactions[this.selectedPatient];
		},
	},
	actions: {
		selectCategory(category) {
			this.selectedCategory = category;
			this.selectedPatient = null;
		},
		selectPatient(id) {
			this.selectedPatient = id;
		},
		async getCurrentSearches(axios) {
			await axios
				.get("/search")
				.then((response) => {
					this.transactions = response.data;
				})
				.catch((error) => {
					console.log(error);
				});
			this.currentLoaded = true;
		},
	},
});
