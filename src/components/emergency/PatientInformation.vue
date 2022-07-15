<template lang="pug">
.container--null(v-if="!patient") No Patient Selected
.container(v-else)
	.container__header
		v-eco-header(:label="patient.name", :type="4", :margin="false")
		.container__status
			v-eco-dot
			v-eco-paragraph(label="Pending")

	.color-grey
		v-eco-header(:label="patient.id", :type="6", :margin="false")

	.details
		.details__phone
			v-eco-input(label="Phone Number", :defaultValue="9983727238")
			v-eco-button(
				label=":ri-phone-line: Call",
				style="height: fit-content",
				theme="primary",
				@click="call"
			)
		.details__blood-group
			v-eco-paragraph(label="Blood Group", type="sidenote")
			form.details__blood-group--grid
				v-eco-radio(
					v-for="bloodGroup in bloodGroups",
					:label="bloodGroup.label"
				)
		v-eco-dropdown(
			label="Nature of Emergency",
			:options="natureOfEmergency",
			placeholder="Unknown"
		)
</template>

<script>
import { mapState } from "pinia";
import { store } from "@/stores/index";

export default {
	name: "PatientInformation",
	data() {
		return {
			bloodGroups: [
				{ label: "A+", value: "A+" },
				{ label: "A-", value: "A-" },
				{ label: "B+", value: "B+" },
				{ label: "B-", value: "B-" },
				{ label: "O+", value: "O+" },
				{ label: "O-", value: "O-" },
				{ label: "AB+", value: "AB+" },
				{ label: "AB-", value: "AB-" },
			],
			natureOfEmergency: [
				{ label: "Bleeding", value: "bleeding" },
				{ label: "Breathing Problem", value: "breathing" },
				{ label: "Mental Status Change", value: "mental" },
				{ label: "Chest Pain", value: "chest" },
				{ label: "Coughing/Vomiting Blood", value: "blood" },
				{ label: "Head/Spine Injury", value: "injury" },
				{ label: "Other", value: "other" },
			],
		};
	},
	computed: {
		...mapState(store, {
			patient: "getPatient",
		}),
	},
	methods: {
		call() {
			window.location.href = "tel:+91123456789";
		},
	},
};
</script>

<style lang="scss" scoped>
.container {
	padding: 0.85rem;
	overflow-y: auto;

	&--null {
		text-align: center;
		margin-top: 1rem;
	}

	&__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&__status {
		display: flex;
		column-gap: 0.75rem;
		align-items: center;
	}
}

.details {
	margin-top: 1rem;

	> * {
		margin: 0.7rem 0;
	}

	&__phone {
		display: grid;
		grid-template-columns: 2fr 1fr;
		align-items: end;
		column-gap: 2rem;
	}

	&__blood-group {
		&--grid {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr;
		}
	}
}
</style>
