<template>
	<div>
		<Md :md="md" />
		<xSelect v-model="value1" multiple placeholder="请选择">
			<xOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </xOption>
		</xSelect>
		<xSelect v-model="value2" multiple collapse-tags style="margin-left: 20px" placeholder="请选择">
			<xOption v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </xOption>
		</xSelect>
	</div>
</template>
<script>
export default async function () {
	return defineComponent({
		data() {
			return {
				md: "适用性较广的基础多选，用 Tag 展示已选项\n\n为`el-select`设置`multiple`属性即可启用多选，此时`v-model`的值为当前选中值所组成的数组。默认情况下选中值会以 Tag 的形式展现，你也可以设置`collapse-tags`属性将它们合并为一段文字。",
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
				value1: [],
				value2: []
			};
		}
	});
}
</script>
<style lang="less"></style>
