<template>
	<div>
		<xMd :md="md" />
		<xForm>
			<div class="block">
				<span class="demonstration">默认</span>
				<xSlider v-model="value"></xSlider>
			</div>
			<div class="block">
				<span class="demonstration">自定义初始值</span>
				<xSlider v-model="value"></xSlider>
			</div>
			<div class="block">
				<span class="demonstration">隐藏 Tooltip</span>
				<xSlider v-model="value" :show-tooltip="false"></xSlider>
			</div>
			<div class="block">
				<span class="demonstration">格式化 Tooltip</span>
				<xSlider v-model="value" :format-tooltip="formatTooltip"></xSlider>
			</div>
			<div class="block">
				<span class="demonstration">禁用</span>
				<xSlider v-model="value" disabled></xSlider>
			</div>
		</xForm>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "通过设置绑定值自定义滑块的初始值",
				value: 0
			};
		},
		methods: {
			formatTooltip(val) {
				return val / 100;
			}
		}
	});
}
</script>
<style lang="less"></style>
