<template>
	<div>
		<xMd :md="md" />
		<xForm>
			<div class="block">
				<span class="demonstration">不显示间断点</span>
				<xSlider v-model="value" :step="10"> </xSlider>
			</div>
			<div class="block">
				<span class="demonstration">显示间断点</span>
				<xSlider v-model="value" :step="10" show-stops> </xSlider>
			</div>
		</xForm>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "改变`step`的值可以改变步长，通过设置`show-stops`属性可以显示间断点",
				value: 0
			};
		}
	});
}
</script>
<style lang="less"></style>
