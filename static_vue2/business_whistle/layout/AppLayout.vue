<template>
	<div id="app" v-xloading="APP.isLoading">阿萨德发斯蒂芬</div>
</template>

<script lang="ts">
export default async function () {
	return {
		components: {},
		inject: ["APP"],
		computed: {
			isShowLoading() {
				return;
			}
		}
	};
}
</script>
