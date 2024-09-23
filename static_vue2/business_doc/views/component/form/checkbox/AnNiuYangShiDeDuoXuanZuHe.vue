<template>
	<div>
		<xMd :md="md" class="mb" />
		<div class="">
			<div class="mt">
				<xCheckboxGroup v-model="checkboxGroup1">
					<xCheckbox-button v-for="city in cities" :label="city" :key="city">{{
						city
					}}</xCheckbox-button>
				</xCheckboxGroup>
			</div>
			<div style="margin-top: 20px">
				<xCheckboxGroup v-model="checkboxGroup2" size="medium">
					<xCheckbox-button v-for="city in cities" :label="city" :key="city">{{
						city
					}}</xCheckbox-button>
				</xCheckboxGroup>
			</div>
			<div style="margin-top: 20px">
				<xCheckboxGroup v-model="checkboxGroup3" size="small">
					<xCheckbox-button
						v-for="city in cities"
						:label="city"
						:disabled="city === '北京'"
						:key="city"
						>{{ city }}</xCheckbox-button
					>
				</xCheckboxGroup>
			</div>
			<div style="margin-top: 20px">
				<xCheckboxGroup v-model="checkboxGroup4" size="mini" disabled>
					<xCheckbox-button v-for="city in cities" :label="city" :key="city">{{
						city
					}}</xCheckbox-button>
				</xCheckboxGroup>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const cityOptions = ["上海", "北京", "广州", "深圳"];

	return defineComponent({
		data() {
			return {
				md: `按钮样式的多选组合。
                
                只需要把\`xCheckbox\`元素替换为\`xCheckbox-button\`元素即可。此外，Element 还提供了\`size\`属性。`,

				checkboxGroup1: ["上海"],
				checkboxGroup2: ["上海"],
				checkboxGroup3: ["上海"],
				checkboxGroup4: ["上海"],
				cities: cityOptions
			};
		}
	});
}
</script>
<style lang="less"></style>
