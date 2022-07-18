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
					return _.chain(state.transactions)
						.filter(
							(patient) =>
								(patient.status === "pending" ||
									patient.status === "initiated") &&
								patient.patient_name !== "Unknown"
						)
						.orderBy(["search_timestamp"], ["desc"])
						.value();
				case "confirmed":
					return _.chain(state.transactions)
						.filter((patient) => patient.status === "confirmed")
						.orderBy(["search_timestamp"], ["desc"])
						.value();
				case "dispatched":
					return _.chain(state.transactions)
						.filter((patient) => patient.status === "dispatched")
						.orderBy(["search_timestamp"], ["desc"])
						.value();
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
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
			this.transactions = _.map(this.transactions, (patient) => {
				return {
					...patient,
					status: patient._id === id ? "dispatched" : patient.status,
				};
			});
			this.selectedCategory = "dispatched";
			this.dispatchLoading = false;
		},
	},
});
