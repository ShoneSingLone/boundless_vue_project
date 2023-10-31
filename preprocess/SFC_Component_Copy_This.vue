<template>
	<div class="component-demo">
		<x-render :render="cpt_labelRender" :configs="configs"> </x-render>
	</div>
</template>

<script>
export default async function () {
	return {
		props: ["configs"],
		model: {},
		created() {},
		beforeDestroy() {},
		mounted() {},
		computed: {
			cpt_labelRender() {
				return "使用h函数";
			}
		},
		watch: {},
		methods: {}
	};
}
</script>

<style>
.component-demo {
	outline: 1px solid red;
}
</style>
