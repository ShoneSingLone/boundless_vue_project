<template>
	<div>
		<xMd :md="md" />
		<xSelect v-model="value" clearable placeholder="请选择">
			<xOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </xOption>
		</xSelect>
	</div>
</template>
<script lang="ts">
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "为`el-select`设置`clearable`属性，则可将选择器清空。需要注意的是，`clearable`属性仅适用于单选。",
				options: [
					{
						value: "选项1",
						label: "黄金糕"
					},
					{
						value: "选项2",
						label: "双皮奶"
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
