<template lang="pug">
.container
	.container__header
		v-eco-header(label="EMERGENCY REQUESTS", :type="6", :margin="false")
	v-eco-toggle.container__toggle(
		:options="toggleOptions",
		:defaultValue="selectedCategory",
		@select="(category) => selectCategory(category)"
	)

	.container__cards
		.card(
			v-for="(patient, index) in cards",
			@click="selectPatient(index)",
			:class="{ 'card--selected': selectedPatient === index }"
		)
			.card__flex
				v-eco-paragraph(:label="patient.name", :margin="false", type="emphasis")
				v-eco-paragraph.color-grey(
					:label="patient.id",
					:margin="false",
					type="code"
				)
			.card__content
				v-eco-paragraph(label="Bellandur", :margin="false")
			.card__flex
				.card__status(v-if="mapStatus(patient.status)")
					v-eco-dot(:hue="mapStatusHue(patient.status)")
					v-eco-paragraph(
						:label="mapStatus(patient.status)",
						type="sidenote",
						:margin="false"
					)
				v-eco-paragraph.color-grey(
					label=":ri-history-line: 3 mins ago",
					:margin="false"
				)
</template>

<script>
import { mapState, mapActions } from "pinia";
import { store } from "@/stores/index";

export default {
	name: "EmergencyRequests",
	computed: {
		...mapState(store, {
			selectedCategory: "selectedCategory",
			selectedPatient: "selectedPatient",
			cards: "getCards",
		}),
	},
	data() {
		return {
			selectedIndex: null,
			toggleOptions: [
				{ label: "Current", value: "current" },
				{ label: "Confirmed", value: "confirmed" },
				{ label: "Dispatched", value: "dispatched" },
			],
		};
	},
	methods: {
		...mapActions(store, {
			selectCategory: "selectCategory",
			selectPatient: "selectPatient",
		}),
		mapStatus(status) {
			switch (status) {
				case "pending":
					return "Pending";
				case "responded":
					return "Responded";
				case "sos":
					return "SOS";
				default:
					return false;
			}
		},
		mapStatusHue(status) {
			switch (status) {
				case "pending":
					return "warning";
				case "responded":
					return "success";
				case "sos":
					return "critical";
				default:
					return false;
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	padding: 0.85rem;
	overflow-y: auto;

	&__header {
		color: $color-helper-link;
	}

	&__toggle {
		margin: 0.7rem 0 0.85rem;
		width: 100% !important;
		display: grid !important;
		grid-template-columns: 1fr 1fr 1fr;
		justify-items: center;
	}

	&__cards {
		display: grid;
		grid-template-columns: 1fr;
		row-gap: 0.75rem;
	}
}

.card {
	background: $color-background;
	padding: 0.5rem 0.85rem;
	border-radius: 8px;
	height: fit-content;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	border: 2px solid transparent;

	&:hover {
		box-shadow: 0px 0px 8px rgba($color-helper-grey, 0.5);
	}

	&--selected {
		border: 2px solid $color-indicator-information;
	}

	&__content {
		display: flex;
		column-gap: 0.5rem;
	}

	&__flex {
		display: flex;
		justify-content: space-between;
	}

	&__status {
		display: flex;
		align-items: center;
		column-gap: 0.5rem;
	}
}
</style>
