<template lang="pug">
.container--null(v-if="!patient") No Patient Selected
.container(v-else)
	.container__header
		v-eco-header(:label="patient.patient_name", :type="4", :margin="false")
		.container__status
			v-eco-dot(:hue="mapStatusHue(patient.status)")
			v-eco-paragraph(:label="mapStatus(patient.status)")

	.color-grey
		v-eco-header(:label="patient._id", :type="6", :margin="false")

	.details
		.details__time
			v-eco-paragraph(
				:label="`Pickup Time: ${$time(patient.pickup_time).format('ddd, DD MMM, hh:mm A')}`",
				type="light"
			)
			.details__time--red
				v-eco-header(
					v-if="patient.pickup_time",
					:label="`:ri-caravan-line: ${$time(patient.pickup_time).fromNow()}`",
					:type="6",
					:margin="false"
				)
		.details__phone(v-if="patient.phone_number")
			v-eco-header(:label="`Phone: ${patient.phone_number}`", :type="6")
			v-eco-button(
				label=":ri-phone-line: Call",
				style="height: fit-content",
				theme="primary",
				@click="call(patient.phone_number)"
			)
		v-eco-button(
			label=":ri-vidicon-line: Join Google Meet",
			style="height: fit-content; width: 100%",
			theme="hue",
			@click="meet"
		)
		.details__blood-group
			v-eco-paragraph(label="Blood Group", type="sidenote")
			form.details__blood-group--grid
				v-eco-radio(
					v-for="bloodGroup in bloodGroups",
					:label="bloodGroup.label",
					:defaultValue="patient.blood_group === bloodGroup.value"
				)
		v-eco-dropdown(
			label="Nature of Emergency",
			:options="natureOfEmergency",
			placeholder="Unknown"
		)
		v-eco-input(label="Message")
		v-eco-input(label="Address")
</template>

<script>
import { mapState } from "pinia";
import { store } from "@/stores/index";
import { mapStatus, mapStatusHue } from "@/assets/helpers";

export default {
	name: "PatientInformation",
	data() {
		return {
			mapStatus,
			mapStatusHue,
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
		call(number) {
			window.location.href = `tel:+91${number}`;
		},
		meet() {
			window.open("https://meet.google.com/");
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

	&__time {
		margin: 1rem 0;

		&--red {
			color: $color-helper-error;
		}
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
