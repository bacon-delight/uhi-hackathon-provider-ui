<template lang="pug">
.layout
	v-eco-sidebar.layout__sidebar(
		:class="[sidebar ? 'layout__sidebar--open' : 'layout__sidebar--closed']",
		:options="sidebarOptions",
		@toggle="sidebar = false",
		@mouseleave="sidebar = false"
	)
	.layout__wrapper(@click="sidebar = false")
		v-eco-navbar(
			brand="HSPA Provider",
			:toggle="true",
			@toggle="sidebar = true",
			:options="[{ type: 'theme' }]"
		)
		.layout__content
			div(v-if="isLandingPage") home
			router-view(v-else)
</template>

<script>
export default {
	name: "LandingPage",
	computed: {
		isLandingPage() {
			return this.$route.path === "/";
		},
	},
	data() {
		return {
			sidebar: false,
			blacklisted: ["/sandbox", "/integration"],
			sidebarOptions: [{ label: "Home", value: "/" }],
		};
	},
};
</script>

<style lang="scss">
.layout {
	height: 100%;

	@include respond-above(sm) {
		display: grid;
		grid-template-columns: min-content 1fr;
	}

	&__sidebar {
		width: 250px !important;

		@include respond-below(sm) {
			position: fixed;
			height: 100%;
			z-index: 10;

			&--closed {
				width: 0;
				display: none;
				opacity: 0;
				padding-right: 0 !important;
			}

			&--open {
				width: 65vw !important;
				box-shadow: 1px 1px 6px rgba(#000000, 0.2);
			}
		}
	}

	&__wrapper {
		height: 100%;
		display: grid;
		grid-template-rows: min-content 1fr;
		overflow: hidden;
	}

	&__content {
		overflow-y: auto;
		padding: 0 1rem;
	}
}
</style>
