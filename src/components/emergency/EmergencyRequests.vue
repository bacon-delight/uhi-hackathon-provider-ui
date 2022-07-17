<template lang="pug">
.container
	.container__header
		v-eco-header(label="EMERGENCY REQUESTS", :type="6", :margin="false")
	v-eco-toggle.container__toggle(
		:options="toggleOptions",
		:defaultValue="selectedCategory",
		@select="(category) => selectCategory(category)"
	)

	CommonLoader.container__loading(v-if="!currentLoaded")
	.container__cards(v-else-if="cards.length")
		.card(
			v-for="(patient, index) in cards",
			@click="selectPatient(patient._id)",
			:class="{ 'card--selected': selectedPatient === patient._id }"
		)
			.card__flex
				v-eco-paragraph(
					:label="patient.patient_name",
					:margin="false",
					type="emphasis"
				)
				v-eco-paragraph.color-grey(
					:label="patient._id.length > 10 ? `${patient._id.slice(0, 5)}...${patient._id.slice(-5)}` : patient._id",
					:margin="false",
					type="code"
				)
			.card__content
				v-eco-paragraph(label="Bellandur", :margin="false")
			.card__content(v-if="patient.pickup_time")
				v-eco-paragraph(
					:label="`:ri-caravan-line: ${$time(patient.pickup_time).format('ddd, DD MMM, hh:mm A')}`",
					:margin="false"
				)
			.card__flex
				.card__status(v-if="mapStatus(patient.status)")
					v-eco-dot(:hue="mapStatusHue(patient.status)")
					v-eco-paragraph(
						:label="mapStatus(patient.status)",
						type="sidenote",
						:margin="false"
					)
				v-eco-paragraph.color-grey(
					:label="`:ri-history-line: ${$time(patient.search_timestamp).fromNow()}`",
					:margin="false"
				)
	.container__empty(v-else) No Data
</template>

<script>
import { mapState, mapActions } from "pinia";
import { store } from "@/stores/index";
import { mapStatus, mapStatusHue } from "@/assets/helpers";
import CommonLoader from "../common/CommonLoader.vue";

export default {
	name: "EmergencyRequests",
	computed: {
		...mapState(store, {
			selectedCategory: "selectedCategory",
			selectedPatient: "selectedPatient",
			cards: "getCards",
			currentLoaded: "currentLoaded",
		}),
	},
	data() {
		return {
			mapStatus,
			mapStatusHue,
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
	},
	components: {
		CommonLoader,
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

	&__empty {
		text-align: center;
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
