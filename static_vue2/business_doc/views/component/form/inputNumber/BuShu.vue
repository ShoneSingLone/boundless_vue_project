<template>
	<div>
		<xMd :md="md" />
		<xInputNumber v-model="num" :step="2"></xInputNumber>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "设置`step`属性可以控制步长，接受一个`Number`。",
				num: 5
			};
		}
	});
}
</script>
<style lang="less"></style>
