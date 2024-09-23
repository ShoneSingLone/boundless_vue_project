<style lang="less">
.sidebarLogoFade-enter-active {
	transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
	opacity: 0;
}

.sidebar-logo-container {
	position: relative;
	width: 100%;
	height: 50px;
	line-height: 50px;
	// background: #2b2f3a;
	text-align: center;
	overflow: hidden;

	.sidebar-logo-link {
		height: 100%;
		width: 100%;

		.sidebar-logo {
			width: 32px;
			height: 32px;
			vertical-align: middle;
			margin-right: 12px;
		}

		.sidebar-title {
			display: inline-block;
			margin: 0;
			color: #fff;
			font-weight: 600;
			line-height: 50px;
			font-size: 14px;
			font-family:
				Avenir,
				Helvetica Neue,
				Arial,
				Helvetica,
				sans-serif;
			vertical-align: middle;
		}
	}

	&.collapse {
		.sidebar-logo {
			margin-right: 0px;
		}
	}
}
</style>
<template>
	<div
		class="sidebar-logo-container"
		:class="{ collapse: collapse }"
		:style="{
			backgroundColor:
				cptSideTheme === 'theme-dark'
					? '--base-menu-background'
					: '--base-menu-light-background'
		}">
		<transition name="sidebarLogoFade">
			<RouterLink v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
				<xIcon v-if="cptLogo" :img="cptLogo" class="sidebar-logo" />
				<h1
					v-else
					class="sidebar-title"
					:style="{
						color:
							cptSideTheme === 'theme-dark'
								? '--base-logo-title-color'
								: '--base-logo-light-title-color'
					}">
					{{ cptTitle }}
				</h1>
			</RouterLink>
			<RouterLink v-else key="expand" class="sidebar-logo-link" to="/">
				<xIcon v-if="cptLogo" :img="cptLogo" class="sidebar-logo" />
				<h1
					class="sidebar-title"
					:style="{
						color:
							cptSideTheme === 'theme-dark'
								? '--base-logo-title-color'
								: '--base-cptLogo-light-title-color'
					}">
					{{ cptTitle }}
				</h1>
			</RouterLink>
		</transition>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		inject: ["APP"],
		props: {
			collapse: {
				type: Boolean,
				required: true
			}
		},
		data() {
			return {};
		},
		computed: {
			cptLogo() {
				return "@/assets/img/logo.png";
			},
			cptSideTheme() {
				return this.APP.settings.sideTheme;
			},
			cptTitle() {
				return this.APP.settings.title;
			}
		}
	});
}
</script>
