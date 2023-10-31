<template>
	<div class="title flex middle xPageTitle">
		<slot name="title">
			<span class="title-text">{{ i18n(title) }}</span>
		</slot>
		<span class="flex1"> </span>
		<slot />
	</div>
</template>

<script>
export default async function () {
	return {
		props: ["title"]
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
