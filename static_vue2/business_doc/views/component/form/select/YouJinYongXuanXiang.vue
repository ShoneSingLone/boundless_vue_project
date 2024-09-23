<template>
	<div>
		<xMd :md="md" />
		<xSelect v-model="value" placeholder="请选择">
			<xOption
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value"
				:disabled="item.disabled">
			</xOption>
		</xSelect>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "在`el-option`中，设定`disabled`值为 true，即可禁用该选项",
				options: [
					{
						value: "选项1",
						label: "黄金糕"
					},
					{
						value: "选项2",
						label: "双皮奶",
						disabled: true
					},
					{
						value: "选项3",
						label: "蚵仔煎"
					},
					{
						value: "选项4",
						label: "龙须面"
					},
					{
						value: "选项5",
						label: "北京烤鸭"
					}
				],
				value: ""
			};
		}
	});
}
</script>
<style lang="less"></style>
