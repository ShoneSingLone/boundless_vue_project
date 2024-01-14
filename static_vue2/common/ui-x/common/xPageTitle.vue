<template>
	<div class="title flex middle xPageTitle">
		<slot name="title">
			<span class="title-text mr4">{{ i18n(title) }}</span>
			<xIcon icon="tips" v-if="tips" v-xtips="i18n(tips)" />
		</slot>
		<span class="flex1"> </span>
		<slot />
	</div>
</template>

<script lang="ts">
export default async function () {
	return {
		props: ["title", "tips"]
	};
}
</script>

<style lang="less">
.xPageTitle {
	.title-text {
		// text-shadow: 1px 1px 1px var(--el-color-black);
		text-shadow: 0.4px 1px 2px #a5a5a5;
	}
}
</style>
