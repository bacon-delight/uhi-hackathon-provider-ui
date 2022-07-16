<template lang="pug">
.layout
	v-eco-navbar(brand="HSPA", :options="[{ type: 'theme' }]")
	.layout__content
		.layout__panes(v-if="isLandingPage")
			EmergencyRequests.layout__panes--item
			PatientInformation.layout__panes--item
			AmbulanceBooking.layout__panes--item 
		router-view(v-else)
</template>

<script>
import { mapState } from "pinia";
import { store } from "@/stores/index";
import EmergencyRequests from "@/components/emergency/EmergencyRequests.vue";
import PatientInformation from "@/components/emergency/PatientInformation.vue";
import AmbulanceBooking from "../components/emergency/AmbulanceBooking.vue";

export default {
	name: "LandingPage",
	computed: {
		isLandingPage() {
			return this.$route.path === "/";
		},
		...mapState(store, {
			current: "current",
		}),
	},
	components: {
		EmergencyRequests,
		PatientInformation,
		AmbulanceBooking,
	},
};
</script>

<style lang="scss" scoped>
.layout {
	height: 100%;
	display: grid;
	grid-template-rows: min-content 1fr;

	&__content {
		width: 100%;
		overflow-y: auto;
	}

	&__panes {
		height: 100%;
		display: grid;
		grid-template-columns: 2fr 3fr 3fr;
		overflow: hidden;

		&--item {
			height: 100%;

			&:not(:last-child) {
				border-right: 1px solid rgba(0, 0, 0, 0.1);
			}
		}
	}
}
</style>
