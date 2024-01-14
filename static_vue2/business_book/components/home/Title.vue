<template>
	<div class="home-title-wrapper">
		<div class="label">{{ label }}</div>
		<div class="btn" @click="click">{{ btn }}</div>
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		props: {
			label: String,
			btn: String
		},
		methods: {
			click() {
				this.$emit("onClick");
			}
		}
	};
}
</script>
