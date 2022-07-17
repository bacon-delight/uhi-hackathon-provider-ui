<template lang="pug">
.container--null(v-if="!patient") No Patient Selected
.container(v-else)
	.container__header
		v-eco-header(label="TYPE", :type="6", :margin="false")
	.container__cards
		.card(
			v-for="(ambulance, index) in ambulanceTypes",
			:class="{ 'card--selected': ambulance.id === patient.fulfillment_type }"
		)
			v-eco-paragraph(:label="ambulance.label", :margin="false", type="light")
			v-eco-paragraph(
				:label="`Rs. ${ambulance.price}/-`",
				:margin="false",
				type="emphasis"
			)

	CommonLoader.container__loading(v-if="loading")
	v-eco-button.container__action(
		v-else-if="patient.status === 'confirmed'",
		label="Dispatch Ambulance",
		theme="primary",
		@click="() => dispatchAmbulance($hspa, patient._id)"
	)

	.container__details(
		v-if="patient.status === 'confirmed' || patient.status === 'dispatched'"
	)
		.details__header
			v-eco-header(label="PAYMENT DETAILS", :type="6", :margin="false")
		.details
			v-eco-paragraph.details__label(
				label="Payment Method",
				type="emphasis",
				:margin="false"
			)
			v-eco-paragraph.details__value(
				label="Card - MasterCard",
				type="light",
				:margin="false"
			)

	.container__details(
		v-if="patient.status === 'confirmed' || patient.status === 'dispatched'"
	)
		.details__header
			v-eco-header(label="AMBULANCE DETAILS", :type="6", :margin="false")
		.details
			v-eco-paragraph.details__label(
				label="Driver",
				type="emphasis",
				:margin="false"
			)
			v-eco-paragraph.details__value(
				:label="patient.dispatch.driver_name",
				type="light",
				:margin="false"
			)
			v-eco-paragraph.details__label(
				label="Registration",
				type="emphasis",
				:margin="false"
			)
			v-eco-paragraph.details__value(
				:label="patient.dispatch.registration_number",
				type="light",
				:margin="false"
			)
			v-eco-paragraph.details__label(
				label="Phone",
				type="emphasis",
				:margin="false"
			)
			v-eco-paragraph.details__value(
				:label="String(patient.dispatch.phone_number)",
				type="light",
				:margin="false"
			)
			v-eco-paragraph.details__label(
				label="OTP",
				type="emphasis",
				:margin="false"
			)
			v-eco-paragraph.details__value(
				:label="String(patient.dispatch.otp)",
				type="light",
				:margin="false"
			)
</template>

<script>
import { mapState, mapActions } from "pinia";
import { store } from "@/stores/index";
import CommonLoader from "../common/CommonLoader.vue";

export default {
	name: "AmbulanceBooking",
	data() {
		return {
			selectedAmbulanceType: null,
			ambulanceTypes: [
				{
					label: "Advanced Life Support",
					price: "5000",
					id: "advanced_life_support",
				},
				{
					label: "Basic Life Support",
					price: "4200",
					id: "basic_life_support",
				},
				{
					label: "Patient Transfer",
					price: "2600",
					id: "patient_transfer",
				},
				{
					label: "Mortuary",
					price: "1300",
					id: "mortuary",
				},
			],
		};
	},
	computed: {
		...mapState(store, {
			patient: "getPatient",
			loading: "dispatchLoading",
		}),
	},
	components: {
		CommonLoader,
	},
	methods: {
		...mapActions(store, ["dispatchAmbulance"]),
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

	&__cards {
		margin: 0.75rem 0;

		> * {
			margin: 0.5rem 0;
		}
	}

	&__action {
		width: 100%;
	}

	&--null {
		text-align: center;
		margin-top: 1rem;
	}
}

.details {
	display: grid;
	grid-template-columns: 1fr 2fr;

	&__header {
		margin-top: 1rem;
		margin-bottom: 0.5rem;
		color: $color-helper-link;
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
	display: flex;
	align-items: center;
	justify-content: space-between;

	&:hover {
		box-shadow: 0px 0px 8px rgba($color-helper-grey, 0.5);
	}

	&--selected {
		border: 2px solid $color-indicator-information;
	}
}
</style>
