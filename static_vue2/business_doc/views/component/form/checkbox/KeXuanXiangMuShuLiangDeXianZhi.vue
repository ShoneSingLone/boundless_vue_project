<template>
	<div>
		<xMd :md="md" class="mb" />
		<xCheckboxGroup v-model="checkedCities" :min="1" :max="2">
			<xCheckbox v-for="city in cities" :label="city" :key="city">{{ city }}</xCheckbox>
		</xCheckboxGroup>
	</div>
</template>
<script lang="ts">
export default async function () {
	const cityOptions = ["上海", "北京", "广州", "深圳"];

	return defineComponent({
		data() {
			return {
				md: `使用 \`min\` 和 \`max\` 属性能够限制可以被勾选的项目的数量。`,
				checkedCities: ["上海", "北京"],
				cities: cityOptions
			};
		}
	});
}
</script>
<style lang="less"></style>
