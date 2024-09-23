<style lang="less">
.navbar-hamburger {
	.hamburger {
		display: inline-block;
		vertical-align: middle;
		width: 20px;
		height: 20px;
		&.is-active {
			transform: rotate(180deg);
		}
	}
}
</style>
<template>
	<div style="padding: 0 15px" @click="toggleClick" class="navbar-hamburger">
		<xIcon
			icon="_menu"
			:class="['hamburger', { 'is-active': isActive }]"
			style="width: 32; height: 32px" />
	</div>
</template>
<script lang="ts">
export default async function () {
	const { THIS_FILE_URL } = this;
	return defineComponent({
		props: {
			isActive: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return { THIS_FILE_URL };
		},
		methods: {
			toggleClick() {
				if (["/my/edit", "/my/profile"].includes(this.$route.path)) {
					this.$router.push("/");
				} else {
					this.$emit("toggleClick");
				}
			}
		}
	});
}
</script>
