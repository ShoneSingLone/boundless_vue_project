<template>
	<component
		class="xColActions"
		:is="currentComponent"
		:configs="this.configs" />
</template>

<script>
export default async function () {
	return {
		props: ["configs"],
		/* row index col prop*/
		computed: {
			currentComponent() {
				if (this.configs.component) {
					return this.configs.component;
				} else {
					/* 有更多选项的 按钮组 */
					return "xOprWithMore";
				}
			}
		}
	};
}
</script>

<style lang="less">
.xColActions {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
