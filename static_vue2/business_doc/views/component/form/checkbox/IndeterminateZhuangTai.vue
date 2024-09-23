<template>
	<div>
		<xMd :md="md" class="mb" />
		<div>
			<xCheckbox
				:indeterminate="isIndeterminate"
				v-model="checkAll"
				@change="handleCheckAllChange"
				>全选</xCheckbox
			>
			<div style="margin: 15px 0"></div>
			<xCheckboxGroup v-model="checkedCities" @change="handleCheckedCitiesChange">
				<xCheckbox v-for="city in cities" :label="city" :key="city">{{ city }}</xCheckbox>
			</xCheckboxGroup>
		</div>
	</div>
</template>
<script lang="ts">
export default async function () {
	const cityOptions = ["上海", "北京", "广州", "深圳"];

	return defineComponent({
		data() {
			return {
				md: `\`indeterminate\` 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果`,
				checkAll: false,
				checkedCities: ["上海", "北京"],
				cities: cityOptions,
				isIndeterminate: true
			};
		},
		methods: {
			handleCheckAllChange(val) {
				this.checkedCities = val ? cityOptions : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			}
		}
	});
}
</script>
<style lang="less"></style>
