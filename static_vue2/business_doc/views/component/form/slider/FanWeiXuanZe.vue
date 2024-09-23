<template>
	<div>
		<xMd :md="md" />
		<xForm>
			<div class="block">
				<xSlider v-model="value" range show-stops :max="10"> </xSlider>
			</div>
		</xForm>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "支持选择某一数值范围\n\n设置`range`即可开启范围选择，此时绑定值是一个数组，其元素分别为最小边界值和最大边界值",
				value: [4, 8]
			};
		}
	});
}
</script>
<style lang="less"></style>
