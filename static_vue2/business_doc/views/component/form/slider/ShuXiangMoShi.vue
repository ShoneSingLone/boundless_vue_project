<template>
	<div>
		<xMd :md="md" />
		<xForm>
			<div class="block">
				<xSlider v-model="value" vertical height="200px"> </xSlider>
			</div>
		</xForm>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "设置`vertical`可使 Slider 变成竖向模式，此时必须设置高度`height`属性",
				value: 0
			};
		}
	});
}
</script>
<style lang="less"></style>
