<template lang="pug">
.container
	.container__header
		v-eco-header(label="TYPE", :type="6", :margin="false")
	.container__cards
		.card(
			v-for="(ambulance, index) in ambulanceTypes",
			@click="selectAmbulance(index)",
			:class="{ 'card--selected': selectedAmbulanceType === index }"
		)
			v-eco-radio(:label="ambulance.label")
			v-eco-paragraph(
				:label="`Rs. ${ambulance.price}/-`",
				:margin="false",
				type="emphasis"
			)
</template>

<script>
export default {
	name: "AmbulanceBooking",
	data() {
		return {
			selectedAmbulanceType: null,
			ambulanceTypes: [
				{
					label: "Advanced Life Support",
					price: "5000",
				},
				{
					label: "Basic Life Support",
					price: "4200",
				},
				{
					label: "Patient Transfer",
					price: "2600",
				},
				{
					label: "Mortuary",
					price: "1300",
				},
			],
		};
	},
	methods: {
		selectAmbulance(index) {
			this.selectedAmbulanceType = index;
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

	&__cards {
		margin: 0.75rem 0;

		> * {
			margin: 0.5rem 0;
		}
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
