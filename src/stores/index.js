import { defineStore } from "pinia";
import _ from "lodash";

export const store = defineStore({
	id: "counter",
	state: () => ({
		selectedCategory: "current",
		selectedPatient: null,
		currentLoaded: false,
		dispatchLoading: false,
		transactions: [],
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
		async dispatchAmbulance(axios, id) {
			this.dispatchLoading = true;
			await axios
				.put(`/dispatch/${id}`)
				.then((response) => {
					if (response.data.dispatched) {
						this.transactions = _.map(
							this.transactions,
							(patient) => {
								return {
									...patient,
									status:
										patient._id === id
											? "dispatched"
											: patient.status,
								};
							}
						);
						this.selectedCategory = "dispatched";
					}
				})
				.catch((error) => {
					console.log(error);
				});
			this.dispatchLoading = false;
		},
	},
});
