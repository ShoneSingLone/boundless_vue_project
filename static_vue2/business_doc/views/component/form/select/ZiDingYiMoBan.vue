<template>
	<div>
		<xMd :md="md" />
		<xSelect v-model="value" placeholder="请选择">
			<xOption
				v-for="item in cities"
				:key="item.value"
				:label="item.label"
				:value="item.value">
				<span style="float: left">{{ item.label }}</span>
				<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
			</xOption>
		</xSelect>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "可以自定义备选项\n\n将自定义的 HTML 模板插入`el-option`的 slot 中即可。",
				cities: [
					{
						value: "Beijing",
						label: "北京"
					},
					{
						value: "Shanghai",
						label: "上海"
					},
					{
						value: "Nanjing",
						label: "南京"
					},
					{
						value: "Chengdu",
						label: "成都"
					},
					{
						value: "Shenzhen",
						label: "深圳"
					},
					{
						value: "Guangzhou",
						label: "广州"
					}
				],
				value: ""
			};
		}
	});
}
</script>
<style lang="less"></style>
